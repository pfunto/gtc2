import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Authentication {
  user: User;
  isLoggedIn: boolean;
}

export interface User {
  id: string;
  email: string;
  firebaseId: string;
  token: string;
}

const initialState: Authentication = {
  user: { id: '', email: '', firebaseId: '', token: '' },
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
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
    clearAuthState: (state) => {
      state.user.id = '';
      state.user.email = '';
      state.user.firebaseId = '';
      state.user.token = 'null';
      state.isLoggedIn = false;
    },
  },
});

export const { setAuthState, setAuthToken, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
