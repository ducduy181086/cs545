import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Import pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageSellers from './pages/Admin/ManageSellers';
import BuyerDashboard from './pages/Buyer/BuyerDashboard';
import SellerDashboard from './pages/Seller/Dashboard/SellerDashboard';
import ManageProducts from './pages/Seller/Products/ManageProducts';
import NotFound from './pages/NotFound';

// Role-based route guards
import PrivateRoute from './components/PrivateRoute';
import ManageOrders from 'pages/Seller/Orders/ManageOrders';
import AddProduct from 'pages/Seller/Products/AddProduct';
import ProductDetail from 'pages/Seller/Products/ProductDetails';
import OrderDetail from 'pages/Seller/Orders/OrderDetails';
import ProductRatings from 'pages/Seller/Products/ProductRatings';

// Buyer Routes
import CartDashboard from 'pages/Buyer/Cart/CartDashboard';
import ShippingDashboard from 'pages/Buyer/ShippingAddress/ShippingDashboard';
import BillingDashboard from 'pages/Buyer/BillingAddress/BillingDashboard';
import PaymentDashboard from 'pages/Buyer/Payment/PaymentDashboard';
import OrderHistoryDashboard from 'pages/Buyer/OrderHistory/OrderHistoryDashboard';
import OrderHistoryDetail from 'pages/Buyer/OrderHistory/OrderHistoryDetail';
import ProductDashboard from 'pages/Buyer/Product/ProductDashboard';


const publicRoutes = [
  { path: "/", element: <BuyerDashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <BuyerDashboard /> },
  { path: "/products/:id", element: <ProductDashboard /> },
];

const buyerRoutes = [
  { path: "/cart", element: <CartDashboard /> },
  { path: "/shipping/confirmation-address", element: <ShippingDashboard /> },
  { path: "/payment", element: <PaymentDashboard /> },
  { path: "/order-history", element: <OrderHistoryDashboard /> },
  { path: "/order-history/:id", element: <OrderHistoryDetail /> },
];

const sellerRoutes = [
  { path: "/seller/dashboard", element: <SellerDashboard /> },
  { path: "/seller/manage-products", element: <ManageProducts /> },
  { path: "/seller/manage-products/add", element: <AddProduct /> },
  { path: "/seller/manage-products/:id", element: <ProductDetail /> },
  { path: "/seller/manage-products/:id/ratings", element: <ProductRatings /> },
  { path: "/seller/manage-orders", element: <ManageOrders /> },
  { path: "/seller/manage-orders/:id", element: <OrderDetail /> },
];

const AppRoutes = () => {
  return (
    <BrowserRouter future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              element
            }
          />
        ))}

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-sellers"
          element={
            <PrivateRoute role="admin">
              <ManageSellers />
            </PrivateRoute>
          }
        />

        {/* --------------- Start Region - Buyer Routes ---------------*/}
        {buyerRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              element
              // <PrivateRoute role="buyer">{element}</PrivateRoute>
            }
          />
        ))}

        {/*  --------------- End Region - Buyer Routes --------------- */}

        {sellerRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute role="SELLER">{element}</PrivateRoute>
            }
          />
        ))}

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
