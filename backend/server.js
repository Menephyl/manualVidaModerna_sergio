import express from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import cors from 'cors';
import 'dotenv/config';
import { sendSaleNotificationEmail } from './services/emailService.js';

// 1. Backend Setup
const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/', (req, res) => {
  res.status(200).send('Backend is running and healthy!');
});

// Inicialize o cliente do Mercado Pago com seu Access Token
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
const payment = new Payment(client);

/**
 * Rota 1: POST /api/checkout/pix
 * Cria um pagamento PIX e retorna os dados para o frontend.
 */
app.post('/api/checkout/pix', async (req, res) => {
  try {
    const { email, amount } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ error: 'Email e valor são obrigatórios.' });
    }

    const paymentData = {
      transaction_amount: Number(amount),
      description: 'E-book "Manual da Vida Moderna"',
      payment_method_id: 'pix',
      payer: {
        email: email,
      },
      // URL que o Mercado Pago notificará quando o status do pagamento mudar.
      notification_url: `${process.env.WEBHOOK_HOST}/api/webhook`,
    };

    const result = await payment.create({ body: paymentData });

    res.json({
      id: result.id,
      qr_code: result.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    console.error('Erro ao criar pagamento PIX:', error);
    res.status(500).json({ error: 'Falha ao processar o pagamento.' });
  }
});

/**
 * Rota para o frontend consultar o status do pagamento.
 */
app.get('/api/payment/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const paymentStatus = await payment.get({ id });
        res.json({ status: paymentStatus.status });
    } catch (error) {
        console.error('Erro ao consultar status do pagamento:', error);
        res.status(500).json({ error: 'Falha ao consultar o pagamento.' });
    }
});

/**
 * Rota 2: POST /api/webhook
 * Recebe notificações de status de pagamento do Mercado Pago.
 */
app.post('/api/webhook', async (req, res) => {
  const { type, data } = req.body;

  // Verificamos se a notificação é de um pagamento
  if (type === "payment") {
    try {
      // Buscamos os detalhes do pagamento usando o ID recebido
      const paymentDetails = await payment.get({ id: data.id }).catch(error => {
        // Se o pagamento não for encontrado (erro 404), não é um erro fatal.
        // Apenas registramos e seguimos em frente, pois pode ser uma notificação de teste.
        if (error.status === 404) {
          console.log(`Webhook: Pagamento com ID ${data.id} não encontrado. Provavelmente é um teste.`);
          return null; // Retorna nulo para que o código abaixo não execute.
        }
        throw error; // Se for outro erro (ex: 403), relança para ser pego pelo catch principal.
      });

      // Se o pagamento foi encontrado e está aprovado, enviamos o e-mail.
      if (paymentDetails && paymentDetails.status === "approved") {
        console.log(`Pagamento ${data.id} aprovado. Enviando notificação...`);
        await sendSaleNotificationEmail(paymentDetails);
      }
    } catch (error) {
      console.error("Erro ao processar webhook:", error);
      return res.sendStatus(500); // Informa ao Mercado Pago que houve um erro
    }
  }

  // Respondemos com 200 OK para o Mercado Pago saber que recebemos a notificação.
  res.sendStatus(200);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend rodando em http://0.0.0.0:${port}`);
});
