import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, name, price, size, image, quantity, stock }
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      const currentQtyInCart = existingItem ? existingItem.quantity : 0;
      const newQty = currentQtyInCart + quantity;

      if (newQty > product.stock) {
        throw new Error(`Cannot add more. Limit exceeded! Only ${product.stock} items left in stock.`);
      }

      if (existingItem) {
        existingItem.quantity = newQty;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          size: product.size,
          image: product.image,
          quantity: quantity,
          stock: product.stock // snapshot of stock at the time of adding
        });
      }
      
      state.totalAmount = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity, maxStock } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity > maxStock) {
          throw new Error(`Quantity exceeds available stock of ${maxStock}`);
        }
        item.quantity = quantity;
        state.totalAmount = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    }
  }
});

export const { addToCart, updateCartQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
