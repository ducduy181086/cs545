import './App.css';
import { AuthProvider } from 'context/AuthContext';
import { CartProvider } from 'context/CartContext';
import AppRoutes from './routes';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
