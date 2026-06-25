import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/authSlice';
import { clearCart } from '../../features/cartSlice';
import { toast } from 'react-toastify';
import { 
  HiMenu, 
  HiX, 
  HiCube, 
  HiOutlineChartBar, 
  HiShoppingBag, 
  HiOutlineUserGroup, 
  HiArrowLeft, 
  HiLogout 
} from 'react-icons/hi';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    toast.success('Admin logged out successfully!');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: HiOutlineChartBar },
    { name: 'Products (CRUD)', path: '/admin/products', icon: HiCube },
    { name: 'Transactions', path: '/admin/transactions', icon: HiShoppingBag },
    { name: 'User Management', path: '/admin/users', icon: HiOutlineUserGroup },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 relative">
      {/* Decorative glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-900 bg-slate-900/30 backdrop-filter backdrop-blur-md p-6 shrink-0 relative z-25">
        {/* Brand */}
        <div className="flex items-center space-x-2 text-brand-500 mb-8">
          <HiCube className="text-3xl" />
          <span className="font-extrabold text-xl tracking-wider text-slate-100">
            ADMIN<span className="text-brand-500">PANEL</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive(item.path)
                    ? 'bg-brand-500 text-slate-950 shadow-lg shadow-brand-500/10'
                    : 'text-slate-400 hover:text-brand-400 hover:bg-slate-900/50'
                }`}
              >
                <Icon className="text-lg" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back and Logout */}
        <div className="border-t border-slate-900 pt-6 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <HiLogout className="text-sm" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Sidebar Drawer for Mobile/Tablet */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Drawer content */}
          <aside className="relative flex flex-col w-64 max-w-xs bg-slate-900 border-r border-slate-800 p-6 z-50 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2 text-brand-500">
                <HiCube className="text-3xl" />
                <span className="font-extrabold text-xl tracking-wider text-slate-100">
                  ADMIN<span className="text-brand-500">PANEL</span>
                </span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white p-1">
                <HiX className="text-xl" />
              </button>
            </div>

            <nav className="flex-grow space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive(item.path)
                        ? 'bg-brand-500 text-slate-950'
                        : 'text-slate-400 hover:text-brand-400 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-slate-800 pt-6 space-y-3">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                <HiArrowLeft />
                <span>Go to Shop</span>
              </Link>
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10"
              >
                <HiLogout />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main View Area */}
      <div className="flex-grow flex flex-col min-h-screen relative z-10 overflow-x-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-900 bg-slate-900/10 backdrop-filter backdrop-blur-md">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
          >
            <HiMenu className="text-2xl" />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Workspace</h2>
            <p className="text-slate-200 text-sm font-semibold">Management Console</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-450 font-medium hidden sm:inline-block">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                A
              </div>
              <span className="text-xs font-semibold text-slate-350">{currentUser?.username || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Viewport for nested pages */}
        <main className="flex-grow p-6 md:p-8 animate-fade-in-up">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
