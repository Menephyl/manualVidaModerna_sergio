import { MercadoPagoConfig, Payment } from 'mercadopago';
import { Resend } from 'resend';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const payment = new Payment(client);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { body } = req;

  // O Mercado Pago envia uma notificação com o ID do pagamento
  if (body.type === 'payment') {
    const paymentId = body.data.id;

    try {
      const paymentDetails = await payment.get({ id: paymentId });

      // Verificamos se o pagamento foi de fato aprovado
      if (paymentDetails.status === 'approved') {
        // AQUI: Lógica de notificação para os dois e-mails
        console.log(`Webhook: Pagamento ${paymentId} aprovado! Enviando e-mails...`);

        await resend.emails.send({
          from: 'Venda Ebook <vendas@seudominio.com>', // Configure um domínio no Resend
          to: ['contato@sergiodiasfilho.com', 'ymenephyl@gmail.com'], // Array com os dois e-mails
          subject: '🎉 [Webhook] Nova Venda do Manual!',
          html: `
            <h1>Venda Confirmada via Webhook!</h1>
            <p><strong>ID do Pagamento:</strong> ${paymentDetails.id}</p>
            <p><strong>Comprador:</strong> ${paymentDetails.payer.first_name || 'Não informado'}</p>
            <p><strong>E-mail:</strong> ${paymentDetails.payer.email}</p>
            <p><strong>Valor:</strong> R$ ${paymentDetails.transaction_amount}</p>
          `,
        });
      }
    } catch (error) {
      console.error('WEBHOOK_ERROR', error);
      // Retornar 200 mesmo em caso de erro para que o Mercado Pago não tente reenviar
      return res.status(200).json({ received: true, error: 'Internal processing error' });
    }
  }

  // É crucial responder com status 200 para o Mercado Pago saber que recebemos a notificação.
  res.status(200).json({ received: true });
}