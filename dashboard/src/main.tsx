import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { router } from './router'
import { useAuthStore } from './store/auth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {(() => { useAuthStore.getState().initializeAuth() })()}
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#52c41a',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>,
)
