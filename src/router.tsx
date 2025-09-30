import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import BarChartPage from './pages/charts/BarChartPage'
import LineChartPage from './pages/charts/LineChartPage'
import PieChartPage from './pages/charts/PieChartPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'charts/bar', element: <BarChartPage /> },
      { path: 'charts/line', element: <LineChartPage /> },
      { path: 'charts/pie', element: <PieChartPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])


