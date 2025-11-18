import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializa o cliente do Mercado Pago com o Access Token do ambiente
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const payment = new Payment(client);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required.' });
    }

    const result = await payment.create({
      body: {
        // transaction_amount: 46.99, // Preço original
        transaction_amount: 0.01, // Preço de teste
        description: 'Manual da Vida Moderna - Ebook',
        payment_method_id: 'pix',
        payer: {
          email: email,
          first_name: name,
          identification: {
            type: 'CPF',
            number: '19119119100', // Usamos um CPF de teste genérico
          },
        },
        // notification_url: `${process.env.APP_URL}/api/payment-webhook`, // This will be enabled in production with a public URL
      },
    });

    const pixData = result.point_of_interaction.transaction_data;

    // Retorna os dados necessários para o frontend renderizar o QR Code e o código
    res.status(201).json({
      paymentId: result.id,
      qrCode: pixData.qr_code_base64, // Imagem do QR Code em base64
      qrCodeString: pixData.qr_code, // O código "Copia e Cola"
    });

  } catch (error) {
    console.error('--- MERCADOPAGO_PIX_ERROR ---');
    // O SDK do Mercado Pago geralmente inclui detalhes do erro na propriedade 'cause'.
    if (error.cause) {
      console.error('Detailed Cause:', JSON.stringify(error.cause, null, 2));
    } else {
      console.error('Full Error:', error);
    }
    res.status(500).json({ 
      error: 'Failed to create PIX payment.',
      details: error.cause ? error.cause : { message: error.message }
    });
  }
}
