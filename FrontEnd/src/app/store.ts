import { configureStore } from '@reduxjs/toolkit';
import recommandSlice from '~/pages/recommand/recommandSlice';
import SurveySlice from '~/pages/Survey/SurveySlice';
export const store = configureStore({
  reducer: {
    recommand: recommandSlice,
    survey: SurveySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
