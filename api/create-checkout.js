import { MercadoPagoConfig, Preference } from 'mercadopago';

// Inicializa o cliente do Mercado Pago com o Access Token do ambiente
// IMPORTANTE: Para testes locais, use o Access Token de TESTE (começa com TEST-...).
// Para produção, use o Access Token de PRODUÇÃO (começa com APP_USR-...).
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validação básica do corpo da requisição
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required.' });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: 'ebook-manual-vida-moderna',
            title: 'Manual da Vida Moderna',
            quantity: 1,
            // unit_price: 46.99, // Preço original
            unit_price: 0.01, // Preço de teste
            picture_url: `${process.env.APP_URL}/ebook-cover.png`,
          },
        ],
        payer: {
          name: name,
          email: email,
        },
        back_urls: {
          // URLs de retorno. A URL de sucesso agora envia o e-mail do pagador para validação.
          success: `${process.env.APP_URL}/success?payer_email=${encodeURIComponent(email)}`,
          failure: `${process.env.APP_URL}/`, // Retorna para a home em caso de falha
          pending: `${process.env.APP_URL}/`, // Retorna para a home em caso de pagamento pendente
        },
        auto_return: 'approved', // Retorna automaticamente para o site após pagamento aprovado
        notification_url: `${process.env.APP_URL}/api/payment-webhook`, // This will be enabled in production with a public URL
      },
    });

    // Retornamos a URL de pagamento para o frontend
    res.status(200).json({ url: result.init_point });
  } catch (error) {
    console.error('MERCADOPAGO_ERROR', error);
    res.status(500).json({ error: 'Failed to create payment preference.' });
  }
}