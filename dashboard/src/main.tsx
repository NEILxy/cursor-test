import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
