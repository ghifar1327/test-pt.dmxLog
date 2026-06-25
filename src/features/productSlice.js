import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: 'pallet-1',
      name: 'Euro Wooden Pallet (EPAL)',
      size: '1200 x 800 x 144 mm',
      price: 15000, // Rp per day
      stock: 120,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkgIJAM47hzbRHKy6y1VAhu7SfW0dE4xgqUMsX05HLprf2zhpTuQ4Y5yNE&s=10',
      description: 'Standard European wooden pallet. Ideal for heavy loads, high durability, and certified for international shipping.'
    },
    {
      id: 'pallet-2',
      name: 'Heavy Duty Plastic Pallet',
      size: '1200 x 1000 x 150 mm',
      price: 25000,
      stock: 75,
      image: 'https://imrnrwxhkjji5o.leadongcdn.com/cloud/qjBqqKRrkSjlrrirlkr/qh-1515_kantuwang.jpg',
      description: 'Hygienic, easy to clean, and extremely weather-resistant plastic pallet. Perfect for food, pharmaceutical, and chemical industries.'
    },
    {
      id: 'pallet-3',
      name: 'Standard Industrial Wooden Pallet',
      size: '1200 x 1000 x 150 mm',
      price: 18000,
      stock: 90,
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Wooden_pallet_with_glove.jpg',
      description: 'Robust 4-way entry block pallet. The most widely used pallet size in North America and industrial logistics.'
    }
  ]
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { name, size, price, stock, image, description } = action.payload;
      const newProduct = {
        id: 'pallet-' + Date.now(),
        name,
        size,
        price: Number(price),
        stock: Number(stock),
        image: image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        description: description || 'No description provided.'
      };
      state.products.push(newProduct);
    },
    updateProduct: (state, action) => {
      const { id, name, size, price, stock, image, description } = action.payload;
      const index = state.products.findIndex(p => p.id === id);
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          name,
          size,
          price: Number(price),
          stock: Number(stock),
          image: image || state.products[index].image,
          description: description || state.products[index].description
        };
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter(p => p.id !== id);
    },
    reduceStock: (state, action) => {
      const itemsToReduce = action.payload; // Array of { palletId, quantity }
      itemsToReduce.forEach(({ palletId, quantity }) => {
        const product = state.products.find(p => p.id === palletId);
        if (product) {
          if (product.stock < quantity) {
            throw new Error(`Insufficient stock for ${product.name}`);
          }
          product.stock -= quantity;
        }
      });
    }
  }
});

export const { addProduct, updateProduct, deleteProduct, reduceStock } = productSlice.actions;
export default productSlice.reducer;
