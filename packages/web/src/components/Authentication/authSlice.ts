import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Authentication {
  user: User;
  isLoggedIn: boolean;
}

export interface User {
  id: string;
  email: string;
  firebaseId: string;
}

const initialState: Authentication = {
  user: { id: '', email: '', firebaseId: '' },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<User>) => {
      const { id, email, firebaseId } = action.payload;
      state.user.id = id;
      state.user.email = email;
      state.user.firebaseId = firebaseId;
      state.isLoggedIn = true;
    },
    clearAuthState: (state) => {
      state.user.id = '';
      state.user.email = '';
      state.user.firebaseId = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
