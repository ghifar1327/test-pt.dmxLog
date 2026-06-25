import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reduceStock } from '../features/productSlice';
import { addTransaction } from '../features/transactionSlice';
import { clearCart } from '../features/cartSlice';
import { toast } from 'react-toastify';
import { HiCreditCard, HiCalendar, HiPhone, HiMapPin, HiShoppingBag } from 'react-icons/hi2';

const phoneRegExp = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;

const schema = yup.object().shape({
  address: yup.string().required('Shipping address is required').min(10, 'Address must be detailed (min 10 characters)'),
  phone: yup.string().required('Phone number is required').matches(phoneRegExp, 'Invalid phone number (e.g. 08123456789)'),
  rentalDuration: yup.number().required('Rental duration is required').typeError('Duration must be a number').min(1, 'Minimum duration is 1 day').max(365, 'Maximum duration is 365 days'),
});

const Payment = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rentalDuration: 7, // default 7 days
    }
  });

  // Watch rental duration to update calculation live
  const rentalDuration = watch('rentalDuration') || 0;
  const finalTotal = totalAmount * (rentalDuration > 0 ? Number(rentalDuration) : 0);

  const onSubmit = (data) => {
    if (items.length === 0) {
      toast.error('Your cart is empty. Please select pallets first.');
      navigate('/products');
      return;
    }

    try {
      // 1. Prepare inventory updates
      const itemsToReduce = items.map(item => ({
        palletId: item.id,
        quantity: item.quantity
      }));

      // 2. Reduce stock first (this will throw if stock is insufficient)
      dispatch(reduceStock(itemsToReduce));

      // 3. Log the transaction
      dispatch(addTransaction({
        userName: currentUser.username,
        address: data.address,
        phone: data.phone,
        rentalDuration: data.rentalDuration,
        items: items,
        totalAmount: finalTotal
      }));

      // 4. Clear the cart
      dispatch(clearCart());

      toast.success('Rental order placed successfully! Pallets have been booked.');
      navigate('/transactions');
    } catch (error) {
      toast.error(error.message || 'Payment processing failed. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-400 mb-4">No items in cart to checkout.</p>
        <button onClick={() => navigate('/products')} className="px-6 py-2 bg-brand-500 text-slate-950 rounded-xl font-bold">
          Browse Pallets
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Payment & Checkout</h1>
        <p className="text-slate-400 text-sm">Provide your logistics shipping address and duration to secure the booking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
              <HiCreditCard className="text-brand-500" />
              <span>Rental Delivery Details</span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <HiPhone />
                  </span>
                  <input
                    type="text"
                    {...register('phone')}
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    placeholder="e.g. 081234567890"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
              </div>

              {/* Rental Duration */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Rental Duration (Days)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <HiCalendar />
                  </span>
                  <input
                    type="number"
                    {...register('rentalDuration')}
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    placeholder="Enter number of days"
                  />
                </div>
                {errors.rentalDuration && <p className="mt-1 text-xs text-red-500">{errors.rentalDuration.message}</p>}
              </div>

              {/* Shipping Address */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Logistics Shipping Address</label>
                <div className="relative">
                  <span className="absolute top-3.5 left-3.5 flex items-start pointer-events-none text-slate-500">
                    <HiMapPin />
                  </span>
                  <textarea
                    rows="4"
                    {...register('address')}
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none"
                    placeholder="Enter full shipping warehouse address details..."
                  ></textarea>
                </div>
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
              </div>

              <div className="bg-brand-500/5 border border-brand-500/10 rounded-2xl p-4 space-y-2 mt-6">
                <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider">Circular Economy Notice:</h4>
                <p className="text-[11px] text-slate-450 leading-relaxed">
                  Upon completion of your rental duration, we will coordinate returning freight details. For extending rental terms, contact our support line.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-brand-500/20 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>Confirm Payment & Book Pallets</span>
              </button>
            </form>
          </div>
        </div>

        {/* Order Details Column */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">Booking Summary</h2>
            
            {/* Items list */}
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-sm">
                  <div>
                    <p className="text-slate-200 font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-slate-500 text-xs">{item.quantity} x {formatter.format(item.price)}/day</p>
                  </div>
                  <span className="font-bold text-slate-300">{formatter.format(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Calculations summary */}
            <div className="space-y-3 text-sm border-t border-slate-850 pt-4">
              <div className="flex justify-between text-slate-400">
                <span>Daily Rental Rate</span>
                <span className="font-semibold text-slate-200">{formatter.format(totalAmount)} / day</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Rental Duration</span>
                <span className="font-semibold text-slate-200">{rentalDuration || 0} days</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white border-t border-slate-850 pt-3">
                <span>Total Payment</span>
                <span className="text-brand-500">{formatter.format(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
