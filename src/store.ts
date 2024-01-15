import {configureStore} from '@reduxjs/toolkit';
import formDataReducer from './slices/formDataSlice';

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
