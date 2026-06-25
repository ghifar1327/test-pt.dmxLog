import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateCartQuantity, removeFromCart } from '../features/cartSlice';
import { EmptyState } from '../components/States';
import { toast } from 'react-toastify';
import { HiPlus, HiMinus, HiTrash, HiArrowRight, HiShoppingBag } from 'react-icons/hi2';

const Cart = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });

  const handleQtyChange = (item, newQty) => {
    // Find the latest stock from product slice (incase it changed)
    const product = products.find(p => p.id === item.id);
    const maxStock = product ? product.stock : item.stock;

    if (newQty <= 0) {
      dispatch(removeFromCart(item.id));
      toast.success(`${item.name} removed from cart.`);
      return;
    }

    try {
      dispatch(updateCartQuantity({ id: item.id, quantity: newQty, maxStock }));
    } catch (error) {
      toast.error(error.message || 'Cannot update quantity.');
    }
  };

  const handleRemoveItem = (id, name) => {
    dispatch(removeFromCart(id));
    toast.success(`${name} removed from cart.`);
  };

  if (items.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          title="Your Cart is Empty"
          message="You have not added any pallets to your rental queue yet. Explore our catalog to find what you need."
          actionLink="/products"
          actionText="Rent Pallets"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Your Rental Cart</h1>
        <p className="text-slate-400 text-sm">Review your selected pallets and quantities before checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const product = products.find(p => p.id === item.id);
            const latestStock = product ? product.stock : item.stock;

            return (
              <div 
                key={item.id}
                className="glass-card p-4 md:p-6 rounded-2xl border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Product Detail */}
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                  <div>
                    <h3 className="text-slate-100 font-bold text-sm md:text-base line-clamp-1">{item.name}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{item.size}</p>
                    <p className="text-brand-500 text-xs font-semibold mt-1">{formatter.format(item.price)} / day</p>
                  </div>
                </div>

                {/* Right Area: Qty controls, subtotal, and trash */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t border-slate-850 sm:border-0 pt-4 sm:pt-0">
                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => handleQtyChange(item, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <HiMinus className="text-xs" />
                    </button>
                    <span className="text-sm font-bold text-slate-200 w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQtyChange(item, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <HiPlus className="text-xs" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[90px]">
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Subtotal</span>
                    <span className="text-slate-200 font-bold text-sm md:text-base">{formatter.format(item.price * item.quantity)}</span>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="p-2.5 rounded-xl hover:bg-red-500/10 text-slate-500 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                  >
                    <HiTrash className="text-lg" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Total Items</span>
                <span className="font-bold text-slate-200">{items.reduce((sum, item) => sum + item.quantity, 0)} units</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Base Rate</span>
                <span className="font-bold text-slate-200">{formatter.format(totalAmount)} / day</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed pt-2 border-t border-slate-850">
                * Rental duration and final totals will be calculated on the next payment page.
              </p>
            </div>

            <button
              onClick={() => navigate('/payment')}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-brand-500/20 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <HiArrowRight />
            </button>

            <Link 
              to="/products"
              className="block text-center text-xs text-slate-400 hover:text-brand-500 transition-colors font-medium"
            >
              Continue Renting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
