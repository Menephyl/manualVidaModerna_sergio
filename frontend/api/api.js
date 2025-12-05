/**
 * Ponto central para todas as chamadas de API.
 * Ele usa variáveis de ambiente para alternar entre a URL de desenvolvimento/proxy
 * e a URL de produção na Render.
 */

// Em produção, `import.meta.env.VITE_API_URL` será 'https://manualvidamoderna-sergio.onrender.com'
// Em desenvolvimento, será `undefined`, e usaremos o caminho relativo '/api' que o Vite irá redirecionar (proxy).
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Função genérica para realizar chamadas fetch.
 * @param {string} endpoint - O endpoint da API a ser chamado (ex: '/leads').
 * @param {RequestInit} options - Opções para a requisição fetch (method, headers, body, etc.).
 * @returns {Promise<any>} - A resposta da API em formato JSON.
 */
const apiClient = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default apiClient;