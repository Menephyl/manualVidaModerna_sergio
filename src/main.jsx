import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { SuccessPage } from './components/SuccessPage.jsx';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/success", element: <SuccessPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
