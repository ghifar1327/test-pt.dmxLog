import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiCube, HiShieldCheck, HiOutlineClock, HiTruck, HiArrowRight } from 'react-icons/hi2';

const Home = () => {
  const { products } = useSelector((state) => state.products);
  const featuredProducts = products.slice(0, 3); // top 3 pallets

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/20 py-20 px-8 md:px-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/10 to-slate-900/30 opacity-50 z-0"></div>
        
        <div className="max-w-2xl space-y-6 relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 border border-brand-500/30 text-brand-400 uppercase tracking-widest">
            Logistics & Warehousing Solutions
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
            Premium Pallet Rentals <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
              For Your Business
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            Rent certified wood, plastic, and heavy-duty export pallets with flexible daily or monthly plans. Optimize your supply chain, reduce storage costs, and scale on demand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-brand-500/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Explore Catalog</span>
              <HiArrowRight />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-semibold rounded-xl transition-all flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Industrial Image container */}
        <div className="w-full md:w-[420px] h-[320px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative shrink-0 z-10">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" 
            alt="Warehouse Pallets"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-filter backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <p className="text-xs text-brand-400 font-bold uppercase">Featured Product</p>
              <p className="text-sm font-bold text-slate-100">EPAL Wooden Pallet</p>
            </div>
            <span className="text-brand-500 font-bold text-xs bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20">
              Rp 15k/day
            </span>
          </div>
        </div>
      </section>

      {/* Highlights / Features Grid */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-white">Why Choose PALLETRENT?</h2>
          <p className="text-slate-400 text-sm">
            We deliver state-of-the-art material handling equipment and pallet assets to scale your logistics operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card rounded-2xl p-8 border border-slate-850 hover:border-brand-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-500 mb-6 group-hover:bg-brand-500 group-hover:text-slate-950 transition-all duration-300">
              <HiShieldCheck className="text-2xl" />
            </div>
            <h3 className="text-slate-200 font-bold text-lg mb-3">Certified Quality</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every pallet is inspect-certified, ISPM-15 heat-treated, and meets rigorous safety standards for international cargo transport.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-2xl p-8 border border-slate-850 hover:border-brand-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-500 mb-6 group-hover:bg-brand-500 group-hover:text-slate-950 transition-all duration-300">
              <HiOutlineClock className="text-2xl" />
            </div>
            <h3 className="text-slate-200 font-bold text-lg mb-3">Flexible Rental Terms</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Rent by day, week, or year. Modify your rental count easily using our admin-managed system with zero hidden surcharges.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-2xl p-8 border border-slate-850 hover:border-brand-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-500 mb-6 group-hover:bg-brand-500 group-hover:text-slate-950 transition-all duration-300">
              <HiTruck className="text-2xl" />
            </div>
            <h3 className="text-slate-200 font-bold text-lg mb-3">Swift Logistics Delivery</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Same-day delivery directly to your factory or warehouse. Fully supported with return shipping pickup service.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="space-y-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white">Popular Rental Pallets</h2>
            <p className="text-slate-400 text-sm">Our most in-demand pallets ready for warehousing deployments.</p>
          </div>
          <Link 
            to="/products" 
            className="text-brand-500 hover:text-brand-400 font-semibold flex items-center space-x-1 group text-sm"
          >
            <span>View All Pallets</span>
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((p) => (
            <div 
              key={p.id} 
              className="glass-card rounded-3xl overflow-hidden border border-slate-850 hover:border-brand-500/20 hover:translate-y-[-4px] transition-all duration-300 flex flex-col group shadow-xl"
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <span className="absolute top-4 right-4 bg-slate-900/90 text-brand-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-800">
                  {p.size}
                </span>
              </div>
              {/* Info */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-slate-200 font-bold text-lg leading-snug group-hover:text-brand-400 transition-colors line-clamp-1">{p.name}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2 mt-2 leading-relaxed">{p.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-auto">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase font-semibold">Rental Price</span>
                    <span className="text-brand-500 font-bold text-sm md:text-base">{formatter.format(p.price)} <span className="text-slate-400 text-xs font-normal">/ day</span></span>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-md font-semibold border ${
                    p.stock > 10 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {p.stock} units left
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="bg-slate-900/20 rounded-3xl p-12 border border-slate-850 flex flex-col md:flex-row items-center justify-around gap-8 text-center">
        <div>
          <p className="text-4xl md:text-5xl font-black text-white">25K+</p>
          <p className="text-sm text-slate-400 mt-2 font-medium">Pallets Rented Weekly</p>
        </div>
        <div className="hidden md:block h-12 w-px bg-slate-800"></div>
        <div>
          <p className="text-4xl md:text-5xl font-black text-white">99.8%</p>
          <p className="text-sm text-slate-400 mt-2 font-medium">Logistics Delivery On-Time</p>
        </div>
        <div className="hidden md:block h-12 w-px bg-slate-800"></div>
        <div>
          <p className="text-4xl md:text-5xl font-black text-white">150+</p>
          <p className="text-sm text-slate-400 mt-2 font-medium">Industrial Hub Warehouses</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
