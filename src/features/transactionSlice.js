import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [
    {
      transactionId: 'TXN-1718029201',
      userName: 'user',
      address: 'Jl. Sudirman No. 45, Jakarta Selatan',
      phone: '081234567890',
      rentalDuration: 30, // 30 days
      items: [
        {
          palletName: 'Euro Wooden Pallet (EPAL)',
          quantity: 20,
          subtotal: 300000 // 20 * 15000
        },
        {
          palletName: 'Heavy Duty Plastic Pallet',
          quantity: 5,
          subtotal: 125000 // 5 * 25000
        }
      ],
      totalAmount: 12750000, // (300k + 125k) * 30 days
      transactionDate: '2026-06-10T10:30:00Z',
    },
    {
      transactionId: 'TXN-1718115602',
      userName: 'john_logistics',
      address: 'Kawasan Industri MM2100, Cibitung',
      phone: '081398765432',
      rentalDuration: 14, // 14 days
      items: [
        {
          palletName: 'Standard Industrial Wooden Pallet',
          quantity: 50,
          subtotal: 900000 // 50 * 18000
        }
      ],
      totalAmount: 12600000, // 900k * 14 days
      transactionDate: '2026-06-15T14:45:00Z',
    },
    {
      transactionId: 'TXN-1718288403',
      userName: 'user',
      address: 'Jl. Gatot Subroto Kav. 23, Jakarta',
      phone: '081234567890',
      rentalDuration: 7, // 7 days
      items: [
        {
          palletName: 'Lightweight Export Paper Pallet',
          quantity: 100,
          subtotal: 1200000 // 100 * 12000
        }
      ],
      totalAmount: 8400000, // 1.2M * 7 days
      transactionDate: '2026-06-20T08:15:00Z',
    }
  ]
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { userName, address, phone, rentalDuration, items, totalAmount } = action.payload;
      
      const newTransaction = {
        transactionId: 'TXN-' + Math.floor(Date.now() / 1000),
        userName,
        address,
        phone,
        rentalDuration: Number(rentalDuration),
        items: items.map(item => ({
          palletName: item.name,
          quantity: item.quantity,
          subtotal: item.price * item.quantity
        })),
        totalAmount,
        transactionDate: new Date().toISOString()
      };
      
      state.transactions.unshift(newTransaction); // Newest first
    }
  }
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
