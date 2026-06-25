import React from 'react';
import { useSelector } from 'react-redux';
import { EmptyState } from '../components/States';
import { HiCalendar, HiMapPin, HiPhone, HiTag } from 'react-icons/hi2';

const TransactionHistory = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const { currentUser } = useSelector((state) => state.auth);
  
  // Filter transactions for logged-in user
  const userTransactions = transactions.filter(
    (t) => t.userName === currentUser?.username
  );

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (userTransactions.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          title="No Transaction Logs Found"
          message="You have not rented any pallets yet. Your rental logs will appear here after you place an order."
          actionLink="/products"
          actionText="Rent Pallets Now"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Your Rental Logs</h1>
        <p className="text-slate-400 text-sm">View details of your past and active pallet rentals.</p>
      </div>

      <div className="space-y-6">
        {userTransactions.map((t) => (
          <div 
            key={t.transactionId}
            className="glass-panel rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6 hover:border-slate-700 transition-colors"
          >
            {/* Header: ID and Date */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-850 pb-4">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Transaction Reference</span>
                <span className="text-slate-100 font-extrabold text-sm md:text-base tracking-wider">{t.transactionId}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Order Date</span>
                <span className="text-slate-400 text-xs flex items-center gap-1 sm:justify-end mt-0.5">
                  <HiCalendar className="text-brand-500" />
                  {formatDate(t.transactionDate)}
                </span>
              </div>
            </div>

            {/* Grid details: shipping info and list */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Shipping Info */}
              <div className="md:col-span-5 space-y-4">
                <h3 className="text-sm font-bold text-slate-350 uppercase tracking-wide">Shipping Information</h3>
                
                <div className="space-y-3 text-xs leading-relaxed text-slate-400">
                  <div className="flex items-start gap-2">
                    <HiMapPin className="text-brand-500 text-base shrink-0 mt-0.5" />
                    <span>{t.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiPhone className="text-brand-500 text-base shrink-0" />
                    <span>{t.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 border-t border-slate-850/65 pt-3 mt-3">
                    <HiTag className="text-brand-500 text-base shrink-0" />
                    <span>Rented for <strong className="text-slate-200">{t.rentalDuration} days</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Items */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-sm font-bold text-slate-350 uppercase tracking-wide">Rented Items</h3>
                
                <div className="space-y-3">
                  {t.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex justify-between items-center bg-slate-900/40 border border-slate-850 p-3.5 rounded-xl text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-200">{item.palletName}</p>
                        <p className="text-slate-500 mt-0.5">Quantity: {item.quantity} units</p>
                      </div>
                      <span className="font-bold text-slate-300">{formatter.format(item.subtotal)} / day</span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center border-t border-slate-850/60 pt-4 mt-4">
                    <span className="text-sm font-extrabold text-slate-200">Total Rental Cost</span>
                    <span className="text-brand-500 font-extrabold text-base md:text-lg">{formatter.format(t.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
