import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  orderDate: "",
  shippingStatus: "",
  paymentStatus: "",
  totalOrderMoney: "",
  shippingFee: "",
  products: [],
  email: "",
  phone: "",
  address: "",
  name: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { product } = action.payload;
      const existingProduct = state.products.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.products.push(product);
      }
    },
    removeOrderProduct: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct) {
        state?.products?.splice(existingProduct, 1);
      }
    },
    updateProductQuantityUp: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },
    removeAllOrderProduct: (state) => {
      state.products = [];
    },
    getTotalMoney: (state, action) => {
      const { TotalMoney } = action.payload;
      state.totalOrderMoney = TotalMoney;
    },
    
  },
});

export const { addOrderProduct, updateProductQuantityUp, removeOrderProduct, removeAllOrderProduct, getTotalMoney } =
  orderSlice.actions;

export default orderSlice.reducer;
