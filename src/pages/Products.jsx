import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import { toast } from 'react-toastify';
import { HiPlus, HiMinus, HiShoppingCart, HiMagnifyingGlass } from 'react-icons/hi2';

const Products = () => {
  const { products } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [quantities, setQuantities] = useState({}); // state mapping product.id -> quantity input

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });

  const handleIncrement = (productId, stock) => {
    const currentQty = quantities[productId] || 1;
    if (currentQty >= stock) {
      toast.warning(`Cannot exceed available stock of ${stock} units.`);
      return;
    }
    setQuantities({ ...quantities, [productId]: currentQty + 1 });
  };

  const handleDecrement = (productId) => {
    const currentQty = quantities[productId] || 1;
    if (currentQty <= 1) return;
    setQuantities({ ...quantities, [productId]: currentQty - 1 });
  };

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast.info('Please log in to add items to the cart.');
      navigate('/login', { state: { from: location } });
      return;
    }

    const quantityToAdd = quantities[product.id] || 1;

    try {
      dispatch(addToCart({ product, quantity: quantityToAdd }));
      toast.success(`${quantityToAdd}x ${product.name} added to cart!`);
      // Reset quantity input to 1
      setQuantities({ ...quantities, [product.id]: 1 });
    } catch (error) {
      toast.error(error.message || 'Failed to add item to cart.');
    }
  };

  // Unique list of sizes for filters
  const uniqueSizes = [...new Set(products.map(p => p.size))];

  // Filtering
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = sizeFilter ? p.size === sizeFilter : true;
    return matchesSearch && matchesSize;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Page Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Pallet Rental Catalog</h1>
        <p className="text-slate-400 text-sm">Select high-quality, standardized pallets suited for your shipping and warehousing demands.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 md:p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <HiMagnifyingGlass />
          </span>
          <input
            type="text"
            placeholder="Search pallets by name, type, wood..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
        </div>

        {/* Filter by Size */}
        <div className="w-full md:w-auto">
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="w-full md:w-56 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm cursor-pointer"
          >
            <option value="">All Sizes</option>
            {uniqueSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12">
          <p className="text-center text-slate-500 font-medium">No pallets match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const qty = quantities[p.id] || 1;
            const inCart = cartItems.find(item => item.id === p.id);
            const qtyInCart = inCart ? inCart.quantity : 0;
            const isOutOfStock = p.stock <= 0;

            return (
              <div 
                key={p.id} 
                className="glass-card rounded-3xl overflow-hidden border border-slate-850 hover:border-brand-500/20 hover:translate-y-[-4px] transition-all duration-300 flex flex-col group shadow-lg"
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden relative bg-slate-900">
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

                {/* Info & Footer */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-slate-100 font-bold text-lg leading-snug group-hover:text-brand-400 transition-colors line-clamp-1">{p.name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{p.description}</p>
                  </div>

                  {/* Stock Information */}
                  <div className="flex items-center justify-between text-xs border-t border-b border-slate-850 py-3">
                    <span className="text-slate-400">Available Stock:</span>
                    {isOutOfStock ? (
                      <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-bold uppercase text-[10px]">Out of Stock</span>
                    ) : (
                      <span className="font-bold text-slate-200">
                        {p.stock} units
                        {qtyInCart > 0 && <span className="text-brand-400 ml-1">({qtyInCart} in cart)</span>}
                      </span>
                    )}
                  </div>

                  {/* Price & Cart Actions */}
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase font-semibold">Price per Day</span>
                      <span className="text-brand-500 font-extrabold text-lg">{formatter.format(p.price)}</span>
                    </div>

                    {!isOutOfStock && (
                      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1.5 space-x-2 shrink-0">
                        <button
                          onClick={() => handleDecrement(p.id)}
                          className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <HiMinus className="text-sm" />
                        </button>
                        <span className="text-sm font-bold text-slate-200 w-6 text-center">{qty}</span>
                        <button
                          onClick={() => handleIncrement(p.id, p.stock - qtyInCart)}
                          className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <HiPlus className="text-sm" />
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    disabled={isOutOfStock || (qtyInCart >= p.stock)}
                    className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-brand-500/20 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HiShoppingCart className="text-lg" />
                    <span>
                      {isOutOfStock 
                        ? 'Out of Stock' 
                        : (qtyInCart >= p.stock ? 'Max in Cart' : 'Rent Now')
                      }
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
