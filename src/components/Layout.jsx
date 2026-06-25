import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Decorative background glow elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-slate-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:px-8 relative z-10 animate-fade-in-up">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
