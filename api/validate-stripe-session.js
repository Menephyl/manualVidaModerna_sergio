// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
//   try {
//     const { sessionId } = req.body;
//     if (!sessionId) {
//       return res.status(400).json({ error: 'Session ID is required.' });
//     }

//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     // Validação: Verifica se o status do pagamento na sessão é 'paid'
//     if (session.payment_status !== 'paid') {
//       return res.status(402).json({ error: `Payment status is not 'paid': ${session.payment_status}` });
//     }

//     // A notificação para o admin é centralizada no webhook.
//     // Aqui, apenas validamos e liberamos o acesso.

//     return res.status(200).json({
//       verified: true,
//       downloadUrl: '/manual-vida-moderna.pdf',
//     });
//   } catch (error) {
//     console.error('STRIPE_SESSION_VALIDATION_ERROR', error);
//     return res.status(500).json({ error: 'An internal error occurred while validating the Stripe session.' });
//   }
// }

export default async function handler(req, res) { res.status(404).json({ message: 'Stripe endpoint disabled.' }); }