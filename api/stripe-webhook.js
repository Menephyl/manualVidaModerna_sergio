// import Stripe from 'stripe';
// import { Resend } from 'resend';
// import { buffer } from 'micro';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const resend = new Resend(process.env.RESEND_API_KEY);
// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// export const config = {
//   api: {
//     bodyParser: false, // Desativa o bodyParser padrão do Next.js/Vercel
//   },
// };

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const buf = await buffer(req);
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
//   } catch (err) {
//     console.error(`Webhook signature verification failed: ${err.message}`);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Lida com o evento de pagamento bem-sucedido
//   if (event.type === 'checkout.session.completed' || event.type === 'payment_intent.succeeded') {
//     const session = event.data.object;
//     const customerEmail = session.customer_details?.email || session.metadata?.customer_email;
//     const customerName = session.customer_details?.name || session.metadata?.customer_name;
//     const amount = session.amount_total || session.amount; // `amount_total` para Checkout, `amount` para PaymentIntent

//     console.log(`Webhook: Pagamento ${session.id} aprovado! Enviando e-mails...`);
//     const fromEmail = process.env.RESEND_FROM_EMAIL;

//     try {
//       const adminEmailPromise = resend.emails.send({
//         from: fromEmail,
//         to: ['contato@sergiodiasfilho.com', 'ysogeek@hotmail.com'],
//         subject: '🎉 [Stripe] Nova Venda do Manual!',
//         html: `
//           <h1>Venda Confirmada via Stripe!</h1>
//           <p><strong>ID do Pagamento:</strong> ${session.id}</p>
//           <p><strong>Comprador:</strong> ${customerName || 'Não informado'}</p>
//           <p><strong>E-mail:</strong> ${customerEmail}</p>
//           <p><strong>Valor:</strong> R$ ${(amount / 100).toFixed(2)}</p>
//         `,
//       });

//       const emailPromises = [adminEmailPromise];

//       if (customerEmail) {
//         const customerEmailPromise = resend.emails.send({
//           from: fromEmail,
//           to: [customerEmail],
//           subject: '✅ Seu Manual da Vida Moderna chegou!',
//           html: `
//             <h1>Obrigado por sua compra, ${customerName || 'amigo(a)'}!</h1>
//             <p>Seu pagamento foi confirmado com sucesso.</p>
//             <p>Agora você já pode acessar seu e-book clicando no link abaixo:</p>
//             <p><a href="${process.env.APP_URL}/manual-vida-moderna.pdf"><strong>Baixar meu Manual da Vida Moderna</strong></a></p>
//             <br>
//             <p>Qualquer dúvida, basta responder a este e-mail.</p>
//             <p>Atenciosamente,<br>Sérgio Dias Filho</p>
//           `,
//         });
//         emailPromises.push(customerEmailPromise);
//       }
//       await Promise.all(emailPromises);
//     } catch (emailError) {
//       console.error('RESEND_EMAIL_ERROR', emailError);
//     }
//   }

//   res.status(200).json({ received: true });
// }

export default async function handler(req, res) { res.status(404).json({ message: 'Stripe endpoint disabled.' }); }