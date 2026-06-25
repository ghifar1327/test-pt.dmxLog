import React from 'react';
import { HiCube, HiShieldCheck, HiArrowRight, HiCpuChip } from 'react-icons/hi2';

const About = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 rounded-full">
          About Us
        </span>
        <h1 className="text-4xl font-extrabold text-white">Our Mission & Standards</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          PALLETRENT is the leading asset-pooling logistics partner providing certified circular economy solutions for modern supply chains.
        </p>
      </section>

      {/* Grid: Story and Image */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100">Pioneering Circular Pallet Logistics</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Founded with a vision to eliminate single-use waste in national cargo shipments, PALLETRENT delivers a highly efficient "rent-and-return" system. Instead of purchasing capital-intensive pallets, companies rent assets as operational expenses, minimizing waste and optimizing warehouse floor space.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            We inspect, repair, sanitize, and certify every single block and runner to guarantee that our assets integrate with automated warehouse storage systems, robot lifters, and standard forklift operators without jamming or damage.
          </p>
        </div>
        <div className="h-80 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
          <img 
            src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=600&q=80" 
            alt="Pallet Production and Warehouse" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 to-transparent"></div>
        </div>
      </section>

      {/* Standards & Certifications */}
      <section className="space-y-8">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-white">Strict Quality Standards</h2>
          <p className="text-slate-400 text-xs mt-2">We maintain full conformity to international cargo rules.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-2xl border border-slate-850">
            <h3 className="text-brand-500 font-bold text-lg mb-2">ISPM-15 Certified</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              All our wooden pallets undergo certified heat treatment to prevent the spread of forest pests across international shipping borders.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-850">
            <h3 className="text-brand-500 font-bold text-lg mb-2">EPAL Standardization</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Our Euro wood pallets match official European Pallet Association dimensions, allowing swap-pool logistics throughout Europe.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-850">
            <h3 className="text-brand-500 font-bold text-lg mb-2">Eco-Friendly Recycled Plastic</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Our plastic pallets are molded from high-density post-consumer recycled plastic, reinforcing our commit to zero-waste.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
