import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products:[],
  search:""
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.products = action.payload
    },
    searchText:(state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct, searchText } = productSlice.actions

export default productSlice.reducer