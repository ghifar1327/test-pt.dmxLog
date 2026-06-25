import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineSearch, HiCalendar, HiPhone, HiTag } from 'react-icons/hi';
import { HiMapPin } from 'react-icons/hi2';

const TransactionManagement = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter transactions
  const filteredTransactions = transactions.filter(
    (t) =>
      t.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Rental Transaction Logs</h1>
          <p className="text-slate-400 text-xs mt-1">Review shipping coordinates, customer details, and total rental contracts.</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs shrink-0">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <HiOutlineSearch />
          </span>
          <input
            type="text"
            placeholder="Search by ID or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-805 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 text-xs"
          />
        </div>
      </div>

      {/* Transactions Grid */}
      <div className="space-y-6">
        {filteredTransactions.map((t) => (
          <div 
            key={t.transactionId}
            className="glass-panel rounded-3xl border border-slate-850 p-6 md:p-8 space-y-6 hover:border-slate-800 transition-colors"
          >
            {/* Header: ID, User, and Date */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-850 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Transaction Reference</span>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-100 font-extrabold text-sm tracking-wider">{t.transactionId}</span>
                  <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[9px] px-2.5 py-0.5 rounded font-bold uppercase">
                    By: {t.userName}
                  </span>
                </div>
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
                <h3 className="text-xs font-bold text-slate-350 uppercase tracking-wide">Shipping Information</h3>
                
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
                    <span>Contract Length: <strong className="text-slate-200">{t.rentalDuration} days</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Items */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xs font-bold text-slate-350 uppercase tracking-wide">Rented Items</h3>
                
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
                    <span className="text-xs font-extrabold text-slate-200">Total Contract Value</span>
                    <span className="text-brand-500 font-extrabold text-sm md:text-base">{formatter.format(t.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredTransactions.length === 0 && (
          <p className="text-center text-slate-500 text-xs py-8">No transaction logs match search query.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionManagement;
