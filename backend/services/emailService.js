import nodemailer from "nodemailer";
import "dotenv/config";

// Configuração do "transporter" do Nodemailer.
// Para produção, é altamente recomendável usar um serviço de e-mail transacional
// como SendGrid, Mailgun ou Amazon SES, em vez de uma conta pessoal do Gmail.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // Ex: "smtp.gmail.com"
  port: process.env.EMAIL_PORT, // Ex: 587
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER, // Seu e-mail
    pass: process.env.EMAIL_PASS, // Sua senha de aplicativo
  },
});

/**
 * Envia um e-mail de notificação de venda.
 * @param {object} payment - O objeto de pagamento do Mercado Pago.
 */
export async function sendSaleNotificationEmail(payment) {
  const recipientEmail = process.env.NOTIFICATION_RECIPIENT_EMAIL;
  if (!recipientEmail) {
    console.error("E-mail do destinatário não configurado. Verifique a variável de ambiente NOTIFICATION_RECIPIENT_EMAIL.");
    return;
  }

  const mailOptions = {
    from: `"Notificação de Venda" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "🎉 Nova venda do e-book 'Manual da Vida Moderna'!",
    html: `
      <h1>Nova Venda Realizada!</h1>
      <p>Olá Sérgio, uma nova cópia do seu e-book foi vendida.</p>
      <p><strong>ID do Pagamento:</strong> ${payment.id}</p>
      <p><strong>Valor:</strong> R$ ${payment.transaction_amount.toFixed(2)}</p>
      <p><strong>Comprador:</strong> ${payment.payer.email}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail de notificação de venda enviado: %s", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar e-mail de notificação:", error);
  }
}

