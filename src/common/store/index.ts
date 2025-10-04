import { configureStore } from '@reduxjs/toolkit';
import { authReducer, itemsReducer } from '../../lib/redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
