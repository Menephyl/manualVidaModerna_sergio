import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Manual da Vida Moderna', // O nome que aparece no checkout
              images: [`${process.env.APP_URL}/ebook-cover.png`],
            },
            // unit_amount: 4700, // R$ 47,00 em centavos
            unit_amount: 50, // R$ 0,50 (mínimo para teste)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      allow_promotion_codes: true, // Opcional: Adiciona um campo para cupons de desconto
      success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/`,
      metadata: {
        customer_name: name,
      }
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('STRIPE_CHECKOUT_ERROR', error);
    res.status(500).json({ error: 'Failed to create Stripe checkout session.' });
  }
}