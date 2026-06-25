import React from 'react';
import { Link } from 'react-router-dom';
import { HiCube, HiEnvelope , HiPhone, HiMapPin } from 'react-icons/hi2';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2 text-brand-500 hover:text-brand-400 transition-colors">
            <HiCube className="text-3xl" />
            <span className="font-extrabold text-xl tracking-wider text-slate-100">
              PALLET<span className="text-brand-500">RENT</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            Leading industrial pallet rental marketplace. Reliable, certified pallets ready for logistics, exports, warehousing, and logistics supply chain optimization.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-slate-200 font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-brand-500 transition-colors">Rent Pallets</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand-500 transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-500 transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-slate-200 font-semibold text-lg mb-4">Pallet Types</h3>
          <ul className="space-y-2 text-sm">
            <li>Standard Wooden</li>
            <li>Heavy Duty Plastic</li>
            <li>Euro Block Pallet</li>
            <li>Lightweight Paper</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-sm">
          <h3 className="text-slate-200 font-semibold text-lg mb-4">Contact Info</h3>
          <div className="flex items-start space-x-2">
            <HiMapPin className="text-brand-500 text-lg shrink-0 mt-0.5" />
            <span>Kawasan Industri Pulogadung, Jakarta Timur, 13920</span>
          </div>
          <div className="flex items-center space-x-2">
            <HiPhone className="text-brand-500 text-lg shrink-0" />
            <span>+62 21-555-9876</span>
          </div>
          <div className="flex items-center space-x-2">
            <HiEnvelope  className="text-brand-500 text-lg shrink-0" />
            <span>support@palletrent.com</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs">
        <p>&copy; {new Date().getFullYear()} PALLETRENT. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Developed for logistics and supply chain optimization.</p>
      </div>
    </footer>
  );
};

export default Footer;
