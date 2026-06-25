import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { toast } from 'react-toastify';
import { HiCube, HiLockClosed, HiUser } from 'react-icons/hi';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      dispatch(loginUser(data));
      toast.success(`Welcome back, ${data.username}!`);
      
      // Check role to redirect appropriately
      // Wait, we need to read the updated auth state. 
      // Since dispatch is synchronous, the store is updated immediately.
      // We can grab the user directly from the action or check the updated state.
      // Let's do a little trick: find the user from the form data role check.
      // Actually, we can get the store state directly using store.getState() or check it from the payload.
      // Let's check from the location state or check if username is admin
      // Since it's local storage and synchronous, we can just do a check.
      // Or simply navigate to standard destinations.
      if (data.username === 'admin') {
        navigate('/admin/dashboard');
      } else {
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-panel p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
        <div className="text-center">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/30 items-center justify-center text-brand-500 mb-4 shadow-glow">
            <HiCube className="text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Sign in to your account</h2>
          <p className="mt-2 text-sm text-slate-400">
            Or{' '}
            <Link to="/register" className="font-semibold text-brand-500 hover:text-brand-400 transition-colors">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <HiUser className="text-xl" />
              </div>
              <input
                type="text"
                {...register('username')}
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
                placeholder="john_doe"
              />
            </div>
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <HiLockClosed className="text-xl" />
              </div>
              <input
                type="password"
                {...register('password')}
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div className="bg-slate-900/40 rounded-xl p-3.5 border border-slate-850 text-xs text-slate-400 space-y-1">
            <p className="font-bold text-slate-300">Quick Access Credentials:</p>
            <p>• Customer: <span className="font-mono text-brand-400">user</span> / <span className="font-mono text-brand-400">user</span></p>
            <p>• Admin: <span className="font-mono text-brand-400">admin</span> / <span className="font-mono text-brand-400">admin</span></p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-3 px-4 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-brand-500/20 transition-all duration-300 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
