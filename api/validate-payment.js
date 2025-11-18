import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializa o cliente do Mercado Pago com o Access Token do ambiente
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId, payerEmail } = req.body;

    if (!paymentId || !payerEmail) {
      return res.status(400).json({ error: 'Payment ID and Payer Email are required.' });
    }

    // 1. Consulta a API do Mercado Pago para obter os detalhes do pagamento
    const paymentDetails = await payment.get({ id: paymentId }).catch(error => {
      // If Mercado Pago returns a 404, it means the paymentId is invalid.
      if (error.statusCode === 404) {
        return null;
      }
      // For other errors, re-throw to be caught by the main catch block.
      throw error;
    });

    // 2. Validação Robusta: Verifica se o status é 'approved'
    if (paymentDetails.status !== 'approved') {
      return res.status(402).json({ error: `Payment status is not approved: ${paymentDetails.status}` });
    }

    // 3. Segurança Aprimorada: Verifica se o e-mail do pagador corresponde
    if (paymentDetails.payer.email.toLowerCase() !== payerEmail.toLowerCase()) {
      // Erro 403: E-mail não corresponde, possível tentativa de fraude.
      // Logar esta tentativa é uma boa prática.
      console.warn(`FRAUD_ATTEMPT: Payer email mismatch. Expected: ${payerEmail}, Got: ${paymentDetails.payer.email}`);
      return res.status(403).json({ error: 'Access denied. Payer information does not match.' });
    }

    // 4. Sucesso: Todas as validações passaram
    // A notificação agora é centralizada no webhook (api/payment-webhook.js)

    return res.status(200).json({
      verified: true,
      downloadUrl: '/manual-vida-moderna.pdf', // Caminho para o arquivo na pasta /public
    });

  } catch (error) {
    console.error('PAYMENT_VALIDATION_ERROR', error);
    // Erro 500: Erro genérico do servidor ou da API do Mercado Pago
    return res.status(500).json({ error: 'An internal error occurred while validating the payment.' });
  }
}