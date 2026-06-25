import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addProduct, updateProduct, deleteProduct } from '../../features/productSlice';
import { toast } from 'react-toastify';
import { HiPlus, HiPencil, HiTrash, HiX, HiPhotograph } from 'react-icons/hi';

const schema = yup.object().shape({
  name: yup.string().required('Pallet name is required').min(3, 'Name must be at least 3 characters'),
  size: yup.string().required('Size dimensions are required (e.g. 1200 x 1000 x 150 mm)'),
  price: yup.number().required('Daily rent price is required').typeError('Price must be a number').min(1, 'Price must be greater than 0'),
  stock: yup.number().required('Initial stock is required').typeError('Stock must be a number').min(0, 'Stock cannot be negative'),
  image: yup.string().url('Must be a valid image URL').notRequired(),
  description: yup.string().notRequired(),
});

const ProductManagement = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProductItem, setEditProductItem] = useState(null); // if null, mode is ADD

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Open modal for add
  const handleOpenAdd = () => {
    setEditProductItem(null);
    reset({
      name: '',
      size: '',
      price: '',
      stock: '',
      image: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEdit = (p) => {
    setEditProductItem(p);
    reset({
      name: p.name,
      size: p.size,
      price: p.price,
      stock: p.stock,
      image: p.image,
      description: p.description
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from listings?`)) {
      try {
        dispatch(deleteProduct(id));
        toast.success(`"${name}" was deleted successfully.`);
      } catch (err) {
        toast.error(err.message || 'Failed to delete product.');
      }
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    try {
      if (editProductItem) {
        // Edit mode
        dispatch(updateProduct({ id: editProductItem.id, ...data }));
        toast.success(`"${data.name}" updated successfully.`);
      } else {
        // Add mode
        dispatch(addProduct(data));
        toast.success(`"${data.name}" added successfully.`);
      }
      setIsModalOpen(false);
      reset();
    } catch (err) {
      toast.error(err.message || 'Operation failed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Pallet Product List</h1>
          <p className="text-slate-400 text-xs mt-1">Manage standard sizes, daily pricing sheets, and current physical stock.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-brand-500/20 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer shrink-0"
        >
          <HiPlus />
          <span>Add New Pallet</span>
        </button>
      </div>

      {/* Grid of Listings */}
      <div className="glass-panel border border-slate-850 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 font-bold uppercase">
                <th className="px-5 py-4">Thumbnail</th>
                <th className="px-5 py-4">Pallet Name</th>
                <th className="px-5 py-4">Size Dimensions</th>
                <th className="px-5 py-4">Rate / Day</th>
                <th className="px-5 py-4">Stock</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/30 transition-colors text-slate-350">
                  <td className="px-5 py-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-850"
                    />
                  </td>
                  <td className="px-5 py-3 font-semibold text-slate-200">
                    <p>{p.name}</p>
                    <p className="text-slate-500 text-[10px] line-clamp-1 font-normal max-w-sm mt-0.5">{p.description}</p>
                  </td>
                  <td className="px-5 py-3 font-medium">{p.size}</td>
                  <td className="px-5 py-3 font-bold text-brand-500">{formatter.format(p.price)}</td>
                  <td className="px-5 py-3 font-semibold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      p.stock <= 20 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-brand-500 hover:border-brand-500/30 transition-all cursor-pointer"
                      >
                        <HiPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Modal dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Container */}
          <div className="relative glass-panel border border-slate-800 rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl animate-fade-in-up z-10">
            <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-6">
              <h3 className="text-lg font-bold text-white">
                {editProductItem ? 'Edit Pallet Listing' : 'Add New Pallet'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs md:text-sm">
              {/* Name */}
              <div>
                <label className="block text-slate-350 font-semibold mb-1 text-xs">Pallet Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="block w-full px-4.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  placeholder="e.g. Standard Wooden Block Pallet"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              {/* Size dimensions */}
              <div>
                <label className="block text-slate-350 font-semibold mb-1 text-xs">Dimensions / Size</label>
                <input
                  type="text"
                  {...register('size')}
                  className="block w-full px-4.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  placeholder="e.g. 1200 x 1000 x 150 mm"
                />
                {errors.size && <p className="mt-1 text-xs text-red-500">{errors.size.message}</p>}
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-350 font-semibold mb-1 text-xs">Rental Price / Day (Rp)</label>
                  <input
                    type="number"
                    {...register('price')}
                    className="block w-full px-4.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="e.g. 15000"
                  />
                  {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-slate-350 font-semibold mb-1 text-xs">Stock Available</label>
                  <input
                    type="number"
                    {...register('stock')}
                    className="block w-full px-4.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="e.g. 100"
                  />
                  {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock.message}</p>}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-slate-350 font-semibold mb-1 text-xs">Image URL (Optional)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <HiPhotograph />
                  </span>
                  <input
                    type="text"
                    {...register('image')}
                    className="block w-full pl-9 pr-4.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-350 font-semibold mb-1 text-xs">Description</label>
                <textarea
                  rows="3"
                  {...register('description')}
                  className="block w-full px-4.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                  placeholder="Detail structural properties, maximum loading metrics, etc..."
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-800 rounded-xl text-slate-300 hover:bg-slate-900 transition-colors text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-xl transition-all text-xs cursor-pointer"
                >
                  {editProductItem ? 'Update Pallet' : 'Create Pallet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
