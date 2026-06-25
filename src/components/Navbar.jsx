import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';
import { clearCart } from '../features/cartSlice';
import { toast } from 'react-toastify';
import { 
  HiMenu, 
  HiX, 
  HiShoppingCart, 
  HiUser, 
  HiLogout, 
  HiChevronDown, 
  HiCube 
} from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pallets', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="glass-panel sticky top-0 z-50 px-4 py-3 md:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-brand-500 hover:text-brand-400 transition-colors">
          <HiCube className="text-3xl animate-pulse-slow" />
          <span className="font-extrabold text-xl tracking-wider text-slate-100">
            PALLET<span className="text-brand-500">RENT</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors ${
                isActive(link.path) 
                  ? 'text-brand-500 border-b-2 border-brand-500 pb-1' 
                  : 'text-slate-300 hover:text-brand-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop User Options / Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-slate-300 hover:text-brand-500 transition-colors">
            <HiShoppingCart className="text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-500 text-slate-950 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalCartItems}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-slate-950 font-bold text-sm">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold max-w-[100px] truncate">{currentUser.username}</span>
                <HiChevronDown className={`transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800 text-xs text-slate-400">
                    Logged in as <span className="font-bold text-brand-400 uppercase">{currentUser.role}</span>
                  </div>
                  
                  {currentUser.role === 'admin' ? (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-500"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/transactions"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-brand-500"
                    >
                      My Transactions
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 flex items-center space-x-2 border-t border-slate-800 mt-1"
                  >
                    <HiLogout />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-slate-950 rounded-lg shadow-lg hover:shadow-brand-500/20 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden space-x-4">
          <Link to="/cart" className="relative p-2 text-slate-300 hover:text-brand-500 transition-colors">
            <HiShoppingCart className="text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-500 text-slate-950 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalCartItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-brand-500 transition-colors p-2"
          >
            {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-800 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium py-1 px-2 rounded ${
                  isActive(link.path) 
                    ? 'text-brand-500 bg-slate-900' 
                    : 'text-slate-300 hover:bg-slate-900 hover:text-brand-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4">
            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-2 py-1">
                  <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-slate-950 font-bold">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{currentUser.username}</p>
                    <p className="text-xs text-brand-400 uppercase font-bold">{currentUser.role}</p>
                  </div>
                </div>

                {currentUser.role === 'admin' ? (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block text-slate-300 hover:text-brand-400 py-1.5 px-2 rounded"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/transactions"
                    onClick={() => setIsOpen(false)}
                    className="block text-slate-300 hover:text-brand-400 py-1.5 px-2 rounded"
                  >
                    My Transactions
                  </Link>
                )}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left text-red-400 hover:bg-slate-900 py-1.5 px-2 rounded flex items-center space-x-2"
                >
                  <HiLogout />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2 border border-slate-700 rounded-lg text-sm font-semibold text-slate-300 hover:text-white"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2 bg-brand-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-brand-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
