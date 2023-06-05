import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const usersSlice = createSlice({
  name: 'users',
  initialState: [{ Ahmed: 256 }],
  reducers: {
    add(state, action) {
      // state.push(action.payload);
      console.log(action.payload);
    },
    remove(state, action) {
      // state.push(action.payload);
      console.log(action.payload);
    },
  },
});

const persistConfig = {
  key: 'users',
  storage,
  // whitelist: ['value'],
};

export const usersReducer = persistReducer(persistConfig, usersSlice.reducer);

export const { add, remove } = usersSlice.actions;

// Selectors
export const getUsersNames = state => state.users;
