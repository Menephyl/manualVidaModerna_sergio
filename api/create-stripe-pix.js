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

    // 1. Cria um PaymentIntent
    let paymentIntent = await stripe.paymentIntents.create({
      amount: 50, // R$ 0,50 (mínimo para teste)
      currency: 'brl',
      metadata: {
        customer_name: name,
        customer_email: email,
      },
    });

    // 2. Confirma o PaymentIntent para gerar os dados do PIX
    // Esta é a etapa que estava faltando.
    paymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method_data: {
        type: 'pix',
      },
    });

    // 3. Agora, o next_action conterá os dados do QR Code
    const pixData = paymentIntent.next_action.pix_display_qr_code;

    res.status(201).json({
      paymentId: paymentIntent.id,
      qrCodeString: pixData.data, // O código "Copia e Cola"
      qrCodeUrl: pixData.image_url_svg, // Priorizar SVG para melhor qualidade
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