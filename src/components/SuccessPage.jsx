import { useState, useEffect, memo } from 'react';
import { Loader2, CheckCircle, XCircle, Download, ArrowLeft, MessageCircle, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Footer as FooterComponent } from './Footer.jsx';
import ebookCover from '../assets/ebook-cover.png';

const Footer = memo(FooterComponent);

export function SuccessPage() {
  const [status, setStatus] = useState('validating'); // 'validating', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const validate = async () => {
      const params = new URLSearchParams(window.location.search);
      const paymentId = params.get('payment_id');
      const payerEmail = params.get('payer_email');

      if (!paymentId || !payerEmail) {
        setStatus('error');
        setErrorMessage('Parâmetros de validação ausentes. Por favor, tente novamente.');
        return;
      }

      try {
        const response = await fetch('/api/validate-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, payerEmail }),
        });

        const data = await response.json();

        // Validação com base na resposta da API
        if (response.ok && data.verified) {
          setStatus('success');
          setDownloadUrl(data.downloadUrl);
        } else {
          // Tratamento de erro aprimorado com base no status HTTP
          let userMessage = data.error || 'Ocorreu um erro ao validar seu pagamento.';
          if (response.status === 403) {
            userMessage = 'As informações do pagamento não correspondem. Por segurança, o download foi bloqueado. Por favor, entre em contato com o suporte.';
          } else if (response.status === 402) {
            userMessage = 'Seu pagamento ainda não foi aprovado. Por favor, verifique o status no seu aplicativo de pagamento e tente novamente em alguns instantes.';
          } else if (response.status === 404) {
            userMessage = 'Não foi possível encontrar os detalhes deste pagamento. O link pode ser inválido ou ter expirado. Por favor, tente gerar um novo link de pagamento.';
          }

          setStatus('error');
          setErrorMessage(userMessage);
        }
      } catch (err) {
        setStatus('error');
        setErrorMessage('Não foi possível conectar ao servidor de validação. Verifique sua conexão.');
      }
    };

    validate();
  }, []);

  const renderContent = () => {
    switch (status) {
      case 'validating':
        return (
          <>
            <Loader2 className="w-16 h-16 text-amber-500 animate-spin" />
            <h1 className="text-3xl font-bold mt-4">Validando seu pagamento...</h1>
            <p className="text-gray-600">Por favor, aguarde um momento.</p>
          </>
        );
      case 'success':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Parabéns pela sua aquisição!</h1>
            <p className="text-lg text-gray-600 mb-10">Seu pagamento foi aprovado. Você está a um passo de iniciar sua jornada de transformação.</p>
            
            <div className="mb-10 transform hover:scale-105 transition-transform duration-500">
              <img 
                src={ebookCover} 
                alt="Capa do Manual da Vida Moderna" 
                className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl border-4 border-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg py-4 px-8">
                <a href={downloadUrl} download>
                  <Download className="mr-3 h-6 w-6" />
                  Clique para baixar
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg py-4 px-8">
                <a href="https://wa.me/5535992144176" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Suporte
                </a>
              </Button>
            </div>
          </div>
        );
      case 'error':
        return (
          <>
            <XCircle className="w-16 h-16 text-red-500" />
            <h1 className="text-3xl font-bold mt-4">Falha na Validação</h1>
            <p className="text-gray-600 mb-8">{errorMessage}</p>
            <Button asChild variant="outline" onClick={() => window.location.href = '/'}>
              <a href="/"><ArrowLeft className="mr-2 h-5 w-5" /> Voltar para o início</a>
            </Button>
          </>
        );
      default:
        return null;
    }
  };

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
