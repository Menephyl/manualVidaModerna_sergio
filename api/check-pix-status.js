import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const payment = new Payment(client);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId } = req.query;

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required.' });
    }

    const paymentDetails = await payment.get({ id: paymentId });

    if (paymentDetails.status === 'approved') {
      // A notificação para o admin já é tratada pelo webhook,
      // então não precisamos duplicar aqui.
      return res.status(200).json({
        status: 'approved',
        downloadUrl: '/manual-vida-moderna.pdf', // Caminho para o arquivo na pasta /public
      });
    }

    // Se não estiver aprovado, retorna o status atual (ex: 'pending')
    return res.status(200).json({ status: paymentDetails.status });

  } catch (error) {
    console.error('CHECK_PIX_STATUS_ERROR', error);
    return res.status(500).json({ error: 'Failed to check payment status.' });
  }
}