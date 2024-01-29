// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// A slice for the invoices state
const invoicesSlice = createSlice({
  name: 'invoices',
  initialState:{
    invoice:[],
    totalamount:null
  },
  reducers: {
    // Add a new invoice to the state
    addInvoice(state, action) {
      state.invoice.push(action.payload);
    },
    // Delete an invoice from the state by id
    deleteInvoice(state, action) {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
  },
});

// Export the action creators and reducer
export const { addInvoice, deleteInvoice } = invoicesSlice.actions;
export const invoicesReducer = invoicesSlice.reducer;

// Create the store
export const store = configureStore({
  reducer: invoicesReducer,
});