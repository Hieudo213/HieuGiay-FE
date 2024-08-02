import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name : '',
  email : '',
  accessToken : '',
  phone: '',
  address: '',
  image: '',
  role: '',
  username: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
        const {name, email, accessToken, phone, image, address, role, username} = action.payload;
        state.name = name;
        state.email = email;
        state.phone = phone;
        state.address = address;
        state.image = image
        state.accessToken = accessToken;
        state.role = role;
        state.username = username
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.address = '';
      state.phone = '';
      state.image = '';
      state.accessToken = '';
      state.role = '';
      state.username = '';
    }
  },
})

// Action creators are generated for each case reducer function
export const {  updateUser, resetUser } = userSlice.actions

export default userSlice.reducer