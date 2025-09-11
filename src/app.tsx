import { RouterProvider } from 'react-router-dom';
import router from './router';
import 'antd/dist/reset.css';
import './index.css';

export default function App() {
  return <RouterProvider router={router} />;
}
