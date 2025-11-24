import { useState, useEffect, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Download, BookOpen, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Footer as FooterComponent } from './Footer.jsx';

const Footer = memo(FooterComponent);

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [validationStatus, setValidationStatus] = useState('validating'); // 'validating', 'success', 'failure'
  const [downloadUrl, setDownloadUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setValidationStatus('failure');
      setErrorMessage('ID da sessão de pagamento ausente. Não foi possível verificar sua compra.');
      return;
    }

    const validate = async () => {
      try {
        const response = await fetch('/api/validate-stripe-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (response.ok && data.verified) {
          setValidationStatus('success');
          setDownloadUrl(data.downloadUrl);
        } else {
          throw new Error(data.error || 'Falha na validação do pagamento.');
        }
      } catch (error) {
        setValidationStatus('failure');
        setErrorMessage(error.message || 'Ocorreu um erro inesperado. Por favor, entre em contato com o suporte.');
      }
    };

    validate();
  }, [searchParams]);

  const renderContent = () => {
    switch (validationStatus) {
      case 'validating':
        return (
          <div className="text-center max-w-md mx-auto">
            <Loader2 className="w-20 h-20 text-amber-500 mx-auto mb-6 animate-spin" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Validando seu pagamento...</h1>
            <p className="text-lg text-gray-600">Por favor, aguarde um momento. Estamos confirmando sua compra.</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Pagamento Aprovado!</h1>
            <p className="text-lg text-gray-600 mb-10">Obrigado pela sua compra! Clique no botão abaixo para baixar seu e-book.</p>
            <div className="p-6 bg-white rounded-2xl shadow-xl border-2 border-gray-200">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 px-8 w-full">
                <a href={downloadUrl} download>
                  <Download className="mr-3 h-6 w-6" />
                  Baixar Manual da Vida Moderna
                </a>
              </Button>
            </div>
          </div>
        );
      case 'failure':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Falha na Verificação</h1>
            <p className="text-lg text-gray-600 mb-10">Não foi possível confirmar seu pagamento.</p>
            <div className="p-6 bg-red-50 rounded-2xl shadow-lg border-2 border-red-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <p className="text-red-700 font-semibold">Motivo: {errorMessage}</p>
              </div>
              <p className="text-gray-700">Se você acredita que isso é um erro, por favor, entre em contato com nosso suporte.</p>
            </div>
          </div>
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
