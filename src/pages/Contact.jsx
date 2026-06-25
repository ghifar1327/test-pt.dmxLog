import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { HiEnvelope, HiPhone, HiMapPin, HiPaperAirplane } from 'react-icons/hi2';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Simulated request
    setTimeout(() => {
      toast.success('Inquiry sent successfully! Our customer support will contact you within 24 hours.');
      reset();
    }, 800);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 rounded-full">
          Contact Us
        </span>
        <h1 className="text-4xl font-extrabold text-white">Get in Touch</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Need a custom rental quote for bulk orders? Have questions about custom pallet specs? Send us a message below.
        </p>
      </section>

      {/* Grid: Details & Form */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card p-8 rounded-3xl border border-slate-850 space-y-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">Headquarters</h2>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-500 shrink-0">
                <HiMapPin className="text-xl" />
              </div>
              <div>
                <p className="text-slate-200 font-semibold text-sm">Location</p>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Kawasan Industri Pulogadung, Jl. Rawa Gelam IV No. 12, Jakarta Timur, 13920
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-500 shrink-0">
                <HiPhone className="text-xl" />
              </div>
              <div>
                <p className="text-slate-200 font-semibold text-sm">Phone Support</p>
                <p className="text-slate-400 text-xs mt-1">+62 21-555-9876</p>
                <p className="text-slate-450 text-[10px]">Mon - Fri, 8:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-500 shrink-0">
                <HiEnvelope className="text-xl" />
              </div>
              <div>
                <p className="text-slate-200 font-semibold text-sm">Email Address</p>
                <p className="text-slate-400 text-xs mt-1">support@palletrent.com</p>
                <p className="text-slate-400 text-xs">sales@palletrent.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 rounded-3xl border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-6">Send an Inquiry</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                  <input
                    type="text"
                    {...register('name')}
                    className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  {...register('subject')}
                  className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="How can we help you?"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                <textarea
                  rows="4"
                  {...register('message')}
                  className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none"
                  placeholder="Detail your requirements (size, quantity needed, duration)..."
                ></textarea>
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-brand-500/20 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <HiPaperAirplane />
              </button>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
