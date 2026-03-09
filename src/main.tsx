import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { AppRouter } from './AppRouter'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
      <Toaster />
    </AuthProvider>
  </StrictMode>,
)
