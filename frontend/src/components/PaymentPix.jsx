import React, { useState } from 'react';

export const PaymentPix = ({ pixData }) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = () => {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2500);
    }
  };

  return (
    <div className="text-center space-y-4 p-4">
      <h2 className="text-xl font-bold text-gray-800">Pague com PIX para concluir</h2>
      <p className="text-sm text-gray-600">Escaneie o QR Code abaixo com o app do seu banco:</p>
      <img
        src={`data:image/png;base64,${pixData.qr_code_base64}`}
        alt="QR Code PIX"
        className="mx-auto border-4 border-gray-200 rounded-lg"
      />
      <p className="text-sm font-semibold text-gray-700 pt-2">Ou use o Pix Copia e Cola:</p>
      <div className="relative">
        <input
          type="text"
          readOnly
          value={pixData.qr_code}
          className="w-full p-3 bg-gray-100 border rounded-lg text-xs sm:text-sm truncate pr-20"
        />
        <button
          onClick={handleCopy}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-amber-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-amber-700 transition-colors"
        >
          {isCopying ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <p className="text-sm text-gray-500 pt-2 animate-pulse">Aguardando confirmação do pagamento...</p>
    </div>
  );
};
