import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/FormSlice';

export const store = configureStore({
  reducer: { form: formReducer }
});
