import { useState, useEffect, memo } from 'react';
import { CheckCircle, MessageCircle, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Footer as FooterComponent } from './Footer.jsx';

const Footer = memo(FooterComponent);

export function SuccessPage() {
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  useEffect(() => {
    const message = "YAN ACABEI DE COMPRAR";
    setWhatsAppMessage(encodeURIComponent(message));
  }, []);

  const renderContent = () => (
    <div className="text-center max-w-2xl mx-auto">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Obrigado pela sua compra!</h1>
      <p className="text-lg text-gray-600 mb-10">Para finalizar e receber seu ebook, por favor, envie o comprovante de pagamento para nosso WhatsApp.</p>
      
      <div className="p-6 bg-white rounded-2xl shadow-xl border-2 border-gray-200">
        <p className="text-gray-700 mb-6">Clique no botão abaixo para abrir o WhatsApp com uma mensagem pronta.</p>
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 px-8 w-full">
          <a href={`https://wa.me/5535992144176?text=${whatsAppMessage}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-3 h-6 w-6" />
            Enviar Comprovante no WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col">
      <header className="bg-gradient-to-r from-amber-800/90 to-amber-900/90 py-4 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-200/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Manual da Vida Moderna
          </h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4 md:p-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
