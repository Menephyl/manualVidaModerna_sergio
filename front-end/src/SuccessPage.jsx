import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Loader2, XCircle, ArrowLeft } from 'lucide-react';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [error, setError] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setStatus('error');
      setError('ID da sessão de pagamento não encontrado.');
      return;
    }

    const verifySession = async () => {
      try {
        const response = await fetch(`/api/validate-stripe-session?session_id=${sessionId}`);
        const data = await response.json();

        if (response.ok && data.verified) {
          setStatus('success');
        } else {
          throw new Error(data.error || 'Não foi possível verificar seu pagamento.');
        }
      } catch (err) {
        setStatus('error');
        setError(err.message);
      }
    };

    verifySession();
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
        <Loader2 className="w-16 h-16 animate-spin text-amber-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Verificando seu pagamento...</h1>
        <p className="text-gray-600">Por favor, aguarde um momento.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Ocorreu um Erro</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link to="/" className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
          <ArrowLeft className="w-5 h-5" />
          Voltar para o Início
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Pagamento Aprovado!</h1>
      <p className="text-lg text-gray-600 mb-8">Obrigado por sua compra! Seu e-book está pronto para download.</p>
      <a href="/manual-vida-moderna.pdf" download className="inline-flex items-center gap-3 bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105">
        <Download className="w-6 h-6" />
        Baixar meu Manual
      </a>
      <p className="text-sm text-gray-500 mt-6">Uma cópia do link para download também foi enviada para seu e-mail.</p>
    </div>
  );
}