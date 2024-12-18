import React, { useEffect } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';

import { setNavigate } from "./utils/utils";

// Import pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import BuyerDashboard from './pages/Buyer/BuyerDashboard';
import ManageProducts from './pages/Seller/Products/ManageProducts';
import NotFound from './pages/NotFound';
import ManageSellersUnapproved from 'pages/Admin/ManageSellers';
import ManageUsers from './pages/Admin/ManageUsers';

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
import ManageCategories from 'pages/Admin/ManageCategories';


const publicRoutes = [
  { path: "/", element: <BuyerDashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <BuyerDashboard /> },
  { path: "/products/:id", element: <ProductDashboard /> },
];

const adminRoutes = [
  { path: "/admin/manage-users", element: <ManageUsers /> },
  { path: "/admin/manage-sellers", element: <ManageSellersUnapproved /> },
  { path: "/admin/manage-categories", element: <ManageCategories /> },
  { path: "/admin/manage-products", element: <ManageProducts /> },
  { path: "/admin/manage-products/:id", element: <ProductDetail /> },
  { path: "/admin/manage-products/:id/ratings", element: <ProductRatings /> },
]

const buyerRoutes = [
  { path: "/cart", element: <CartDashboard /> },
  { path: "/shipping/confirmation-address", element: <ShippingDashboard /> },
  { path: "/shipping/billing-address", element: <BillingDashboard /> },
  { path: "/payment", element: <PaymentDashboard /> },
  { path: "/order-history", element: <OrderHistoryDashboard /> },
  { path: "/order-history/:id", element: <OrderHistoryDetail /> },
];

const sellerRoutes = [
  { path: "/seller/manage-products", element: <ManageProducts /> },
  { path: "/seller/manage-products/add", element: <AddProduct /> },
  { path: "/seller/manage-products/:id", element: <ProductDetail /> },
  { path: "/seller/manage-products/:id/ratings", element: <ProductRatings /> },
  { path: "/seller/manage-orders", element: <ManageOrders /> },
  { path: "/seller/manage-orders/:id", element: <OrderDetail /> },
];

const AppRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
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
      {adminRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute role="ADMIN">{element}</PrivateRoute>
          }
        />
      ))}


      {/* --------------- Start Region - Buyer Routes ---------------*/}
      <Route path="/admin" element={<Navigate replace to="/admin/manage-users" />} />

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
      <Route path="/seller" element={<Navigate replace to="/seller/manage-products" />} />

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
  );
};

export default AppRoutes;
