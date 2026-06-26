import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout & Protected Route components
import Layout from './components/Layout';
import ProtectedRoute, { AdminBlockRoute } from './components/ProtectedRoute';

// Public & User pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import TransactionHistory from './pages/TransactionHistory';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import UserManagement from './pages/admin/UserManagement';
import TransactionManagement from './pages/admin/TransactionManagement';

function App() {
  // const DownloadButton = () => {
  //   const apkLink = "https://github.com/ghifar1327/test-pt.dmxLog/releases/tag/v1.0.0";
  // };
  return (
    <>
    {/* <a 
      href={apkLink} 
      className="hidden bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      download
      >
      Download APK Prototype
    </a> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* PUBLIC & USER SHOP VIEWS (With Layout and Footer) */}
            {/* <AdminBlockRoute> */}
               <Route path="/" element={<AdminBlockRoute><Layout><Home /></Layout></AdminBlockRoute>} />
               <Route path="/about" element={<AdminBlockRoute><Layout><About /></Layout></AdminBlockRoute>} />
               <Route path="/contact" element={<AdminBlockRoute><Layout><Contact /></Layout></AdminBlockRoute>} />
               <Route path="/products" element={<AdminBlockRoute><Layout><Products /></Layout></AdminBlockRoute>} />
            {/* </AdminBlockRoute> */}
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />

            {/* USER ONLY PROTECTED VIEWS (With Layout and Footer) */}
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Layout><Cart /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Layout><Payment /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Layout><TransactionHistory /></Layout>
                </ProtectedRoute>
              } 
            />

            {/* ADMIN ONLY VIEWS (With Sidebar and Top Header) */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* Nested admin subroutes */}
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="transactions" element={<TransactionManagement />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Global toast notification system */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        </BrowserRouter>
      </PersistGate>
    </Provider>
            </>
  );
}

export default App;
