import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: "O pagamento é seguro?",
    answer: "Sim, 100% seguro. Todas as transações são processadas pelo Mercado Pago, uma das maiores e mais seguras plataformas de pagamento da América Latina. Seus dados financeiros nunca são compartilhados conosco."
  },
  {
    question: "Como receberei o e-book após a compra?",
    answer: "O acesso é imediato! Assim que seu pagamento for aprovado, você verá um botão para baixar o e-book em formato PDF diretamente na tela. Uma cópia do link para download também será enviada para o seu e-mail."
  },
  {
    question: "Posso ler em qualquer dispositivo?",
    answer: "Sim! O e-book é entregue em formato PDF, que é compatível com praticamente todos os dispositivos: smartphones, tablets, computadores (Windows e Mac) e leitores de e-book como o Kindle."
  },
  {
    question: "E se eu não gostar do conteúdo?",
    answer: "Sua satisfação é nossa prioridade. Oferecemos uma garantia de satisfação de 7 dias. Se por qualquer motivo você não se sentir transformado pelo conteúdo, basta entrar em contato e nós reembolsaremos seu investimento integralmente."
  }
];

export function FAQ() {
  return (
    <section className="py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Tirando suas dúvidas para uma compra tranquila.
          </p>
        </div>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <details key={index} className="group bg-gray-50 p-6 rounded-lg border border-gray-200 cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-gray-800 text-lg list-none">
                {item.question}
                <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}