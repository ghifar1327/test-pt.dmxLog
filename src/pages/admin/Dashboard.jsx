import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  HiOutlineCube, 
  HiOutlineDatabase, 
  HiOutlineCurrencyDollar, 
  HiOutlineTrendingUp,
  HiOutlineExclamationCircle 
} from 'react-icons/hi';

const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { transactions } = useSelector((state) => state.transactions);

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });

  // Calculate statistics
  const totalPalletTypes = products.length;
  const totalAvailableStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalBookings = transactions.length;
  const totalRevenue = transactions.reduce((sum, t) => sum + t.totalAmount, 0);

  // Products with low stock (e.g. stock <= 80)
  const lowStockProducts = products.filter(p => p.stock <= 80);

  // Top 5 recent transactions
  const recentTransactions = transactions.slice(0, 5);

  const stats = [
    {
      name: 'Pallet Varieties',
      value: totalPalletTypes,
      icon: HiOutlineCube,
      color: 'text-brand-500 bg-brand-500/10 border-brand-500/20'
    },
    {
      name: 'Total Units Available',
      value: totalAvailableStock,
      icon: HiOutlineDatabase,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      name: 'Total Bookings Logged',
      value: totalBookings,
      icon: HiOutlineTrendingUp,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      name: 'Gross Rental Revenue',
      value: formatter.format(totalRevenue),
      icon: HiOutlineCurrencyDollar,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard Overview</h1>
        <p className="text-slate-400 text-xs mt-1">Real-time indicators and operational summary of the pallet fleet.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className="glass-card p-6 rounded-2xl border border-slate-850 flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase font-bold tracking-wider">{stat.name}</span>
                <span className="text-slate-100 font-extrabold text-xl md:text-2xl">{stat.value}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${stat.color}`}>
                <Icon className="text-2xl" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Transactions Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100">Recent Rental Orders</h3>
            <Link to="/admin/transactions" className="text-xs font-semibold text-brand-500 hover:text-brand-400 transition-colors">
              Manage Orders &rarr;
            </Link>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-850 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 font-bold uppercase">
                    <th className="px-5 py-4">Transaction ID</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Duration</th>
                    <th className="px-5 py-4">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/60">
                  {recentTransactions.map((t) => (
                    <tr key={t.transactionId} className="hover:bg-slate-900/30 transition-colors text-slate-300">
                      <td className="px-5 py-4 font-mono font-bold text-slate-200">{t.transactionId}</td>
                      <td className="px-5 py-4">{t.userName}</td>
                      <td className="px-5 py-4">{t.rentalDuration} days</td>
                      <td className="px-5 py-4 font-bold text-brand-500">{formatter.format(t.totalAmount)}</td>
                    </tr>
                  ))}
                  {recentTransactions.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-slate-500">No transactions recorded.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts Column */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-base font-bold text-slate-100">Stock Warnings</h3>
          
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 space-y-4">
            <div className="flex items-center space-x-2 text-amber-500">
              <HiOutlineExclamationCircle className="text-xl" />
              <span className="text-xs font-bold uppercase tracking-wider">Low Stock Threshold (&le; 80)</span>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {lowStockProducts.map((p) => (
                <div 
                  key={p.id}
                  className="flex justify-between items-center bg-slate-900/40 border border-slate-850 p-3 rounded-xl text-xs"
                >
                  <div className="max-w-[150px] truncate">
                    <p className="font-bold text-slate-350">{p.name}</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">{p.size}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded font-bold ${
                    p.stock <= 10 
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {p.stock} units
                  </span>
                </div>
              ))}
              {lowStockProducts.length === 0 && (
                <p className="text-slate-500 text-xs text-center py-4">All pallet stocks are healthy.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
