import { configureStore } from '@reduxjs/toolkit';
import recommandSlice from '~/pages/recommand/recommandSlice';
export const store = configureStore({
  reducer: {
    recommand: recommandSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
