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
          <AppRoutes />
        </ShippingProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
