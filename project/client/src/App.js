import { BrowserRouter } from "react-router-dom";

import './App.css';

import { AuthProvider } from 'context/AuthContext';
import { CartProvider } from 'context/CartContext';
import AppRoutes from './routes';
import { ShippingProvider } from 'context/ShippingContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ShippingProvider>
          <BrowserRouter future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}>
            <AppRoutes />
          </BrowserRouter>
        </ShippingProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
