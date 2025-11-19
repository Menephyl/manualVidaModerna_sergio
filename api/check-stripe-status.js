import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { paymentId } = req.query;

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required.' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntent.status === 'succeeded') {
      return res.status(200).json({
        status: 'approved', // Mapeia 'succeeded' para 'approved' para manter consistência com o frontend
        downloadUrl: '/manual-vida-moderna.pdf',
      });
    }

    return res.status(200).json({ status: paymentIntent.status });
  } catch (error) {
    console.error('CHECK_STRIPE_STATUS_ERROR', error);
    return res.status(500).json({ error: 'Failed to check Stripe payment status.' });
  }
}