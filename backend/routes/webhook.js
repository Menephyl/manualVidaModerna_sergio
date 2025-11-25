import { Router } from "express";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { sendSaleNotificationEmail } from "../services/emailService.js";

const router = Router();

// Inicialize o cliente do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});
const payment = new Payment(client);

router.post("/webhook", async (req, res) => {
  const { type, data } = req.body;

  // Verificamos se a notificação é de um pagamento
  if (type === "payment") {
    try {
      // Buscamos os detalhes do pagamento usando o ID recebido
      const paymentDetails = await payment.get({ id: data.id });

      // Se o pagamento foi aprovado, enviamos o e-mail
      if (paymentDetails.status === "approved") {
        console.log(`Pagamento ${data.id} aprovado. Enviando notificação...`);
        await sendSaleNotificationEmail(paymentDetails);
      }
    } catch (error) {
      console.error("Erro ao processar webhook:", error);
      return res.sendStatus(500);
    }
  }

  // Respondemos com 200 OK para o Mercado Pago saber que recebemos a notificação.
  res.sendStatus(200);
});

export default router;

