import { configureStore } from '@reduxjs/toolkit';
import recommandSlice from '~/pages/recommand/recommandSlice';
import SurveySlice from '~/pages/Survey/SurveySlice';
import ModalSlice from '~/pages/home/components/MidSection/ModalSlice';
export const store = configureStore({
  reducer: {
    recommand: recommandSlice,
    survey: SurveySlice,
    modal: ModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
