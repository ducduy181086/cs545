import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Import pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageSellers from './pages/Admin/ManageSellers';
import BuyerDashboard from './pages/Buyer/BuyerDashboard';
import ProductList from './pages/Buyer/ProductList';
import SellerDashboard from './pages/Seller/Dashboard/SellerDashboard';
import ManageProducts from './pages/Seller/Products/ManageProducts';
import NotFound from './pages/NotFound';

// Role-based route guards
import PrivateRoute from './components/PrivateRoute';
import ManageOrders from 'pages/Seller/Orders/ManageOrders';
import AddProduct from 'pages/Seller/Products/AddProduct';
import ShoppingCart from 'pages/Buyer/Cart/ShoppingCart';
import ProductDetail from 'pages/Seller/Products/ProductDetails';
import OrderDetail from 'pages/Seller/Orders/OrderDetails';

const AppRoutes = () => {
  return (
    <BrowserRouter future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
        <Route
          path="/dashboard"
          element={
            // <PrivateRoute role="buyer">
            <BuyerDashboard />
            // </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            // <PrivateRoute role="buyer">
            <ShoppingCart />
            // </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute role="buyer">
              <ProductList />
            </PrivateRoute>
          }
        />

        {/*  --------------- End Region - Buyer Routes --------------- */}

        <Route
          path="/seller/dashboard"
          element={
            // <PrivateRoute role="seller">
            <SellerDashboard />
            // </PrivateRoute>
          }
        />
        <Route
          path="/seller/manage-products"
          element={
            // <PrivateRoute role="seller">
            <ManageProducts />
            // </PrivateRoute>
          }
        />
        <Route
          path="/seller/manage-products/add"
          element={
            <AddProduct />
          } />
        <Route
          path="/seller/manage-products/:id"
          element={
            <ProductDetail />
          } />
        <Route
          path="/seller/manage-orders"
          element={
            // <PrivateRoute role="seller">
            <ManageOrders />
            // </PrivateRoute>
          }
        />
        <Route
          path="/seller/manage-orders/:id"
          element={
            // <PrivateRoute role="seller">
            <OrderDetail />
            // </PrivateRoute>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
