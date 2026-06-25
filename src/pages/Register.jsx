import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { toast } from 'react-toastify';
import { HiCube, HiLockClosed, HiUser, HiKey } from 'react-icons/hi';
import { HiEnvelope } from 'react-icons/hi2';

const schema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
  confirmPassword: yup.string().required('Please confirm your password').oneOf([yup.ref('password'), null], 'Passwords must match'),
  role: yup.string().required('Role selection is required'),
  adminKey: yup.string().when('role', {
    is: 'admin',
    then: () => yup.string().required('Secret admin code is required'),
    otherwise: () => yup.string().notRequired(),
  }),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('user');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'user',
      adminKey: '',
    }
  });

  const handleRoleChange = (e) => {
    const val = e.target.value;
    setSelectedRole(val);
    setValue('role', val);
  };

  const onSubmit = (data) => {
    try {
      dispatch(registerUser(data));
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-panel p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
        <div className="text-center">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/30 items-center justify-center text-brand-500 mb-4 shadow-glow">
            <HiCube className="text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Create your account</h2>
          <p className="mt-2 text-sm text-slate-400">
            Or{' '}
            <Link to="/login" className="font-semibold text-brand-500 hover:text-brand-400 transition-colors">
              sign in to your existing account
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

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <HiEnvelope className="text-xl" />
              </div>
              <input
                type="email"
                {...register('email')}
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
                placeholder="john@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Role selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Account Role</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex items-center justify-center p-3 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${
                selectedRole === 'user'
                  ? 'bg-brand-500/10 border-brand-500 text-brand-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}>
                <input
                  type="radio"
                  value="user"
                  checked={selectedRole === 'user'}
                  onChange={handleRoleChange}
                  className="sr-only"
                />
                Customer
              </label>
              
              <label className={`flex items-center justify-center p-3 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${
                selectedRole === 'admin'
                  ? 'bg-brand-500/10 border-brand-500 text-brand-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}>
                <input
                  type="radio"
                  value="admin"
                  checked={selectedRole === 'admin'}
                  onChange={handleRoleChange}
                  className="sr-only"
                />
                Administrator
              </label>
            </div>
          </div>

          {/* Admin key field */}
          {selectedRole === 'admin' && (
            <div className="animate-fade-in-up">
              <label className="block text-sm font-medium text-brand-400 mb-1">Secret Admin Key</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-500">
                  <HiKey className="text-xl" />
                </div>
                <input
                  type="password"
                  {...register('adminKey')}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-brand-500/30 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
                  placeholder="Enter admin verification code"
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">Reference: `4Pl!k@s1pROTotYp3`</p>
              {errors.adminKey && <p className="mt-1 text-xs text-red-500">{errors.adminKey.message}</p>}
            </div>
          )}

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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <HiLockClosed className="text-xl" />
              </div>
              <input
                type="password"
                {...register('confirmPassword')}
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-3 px-4 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-brand-500/20 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
