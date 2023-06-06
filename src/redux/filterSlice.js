import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { filteredContacts: [{ id: 1, name: 'ali', number: 777 }] },
  reducers: {
    filter(state, action) {},
  },
});

const persistConfig = {
  key: 'filter',
  storage,
  // whitelist: ['value'],
};

export const filterReducer = persistReducer(persistConfig, filterSlice.reducer);

export const { add, remove } = filterSlice.actions;

// Selectors
export const getFilteredNames = state => state.filter.filteredContacts;
