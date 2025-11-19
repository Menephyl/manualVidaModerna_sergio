import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email e nome são obrigatórios.' });
    }

    // Cria um PaymentIntent com o método de pagamento PIX
    const paymentIntent = await stripe.paymentIntents.create({
      // amount: 4700, // R$ 47,00 em centavos
      amount: 50, // R$ 0,50 (mínimo para teste)
      currency: 'brl',
      payment_method_types: ['pix'],
      receipt_email: email,
      description: 'Manual da Vida Moderna - Ebook',
      metadata: {
        customer_name: name,
        customer_email: email,
      },
    });

    const pixData = paymentIntent.next_action.pix_display_qr_code;

    res.status(201).json({
      paymentId: paymentIntent.id,
      qrCodeString: pixData.data, // O código "Copia e Cola"
      qrCodeUrl: pixData.image_url_png, // URL da imagem do QR Code
    });

  } catch (error) {
    console.error('--- STRIPE_PIX_ERROR ---');
    if (error.raw) {
      console.error('Detailed Cause:', JSON.stringify(error.raw, null, 2));
    } else {
      console.error('Full Error:', error);
    }
    res.status(500).json({
      error: 'Failed to create Stripe PIX payment.',
      details: error.raw ? { description: error.raw.message } : { description: error.message }
    });
  }
}