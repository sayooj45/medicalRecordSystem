import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { LoginProvider } from './context/LoginProvider.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <LoginProvider>
    <App />
  </LoginProvider>
  </StrictMode>,
)
