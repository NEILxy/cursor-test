import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'
import { useAuthStore } from './store/auth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {(() => { useAuthStore.getState().initializeAuth() })()}
    <App />
  </StrictMode>,
)
