import React from 'react';
import { Link } from 'react-router-dom';
import { HiCubeTransparent, HiOutlineInbox } from 'react-icons/hi2';

export const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-brand-500 animate-spin"></div>
      </div>
      <p className="text-slate-400 font-medium text-sm animate-pulse">{message}</p>
    </div>
  );
};

export const EmptyState = ({ 
  title = 'No items found', 
  message = 'We could not find any items matching your request.', 
  actionLink, 
  actionText 
}) => {
  return (
    <div className="glass-card rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-8 border border-slate-800">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-6 shadow-inner">
        <HiOutlineInbox className="text-3xl" />
      </div>
      <h3 className="text-slate-200 font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{message}</p>
      {actionLink && actionText && (
        <Link
          to={actionLink}
          className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-slate-950 rounded-xl font-semibold shadow-lg hover:shadow-brand-500/20 transition-all duration-300"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};
