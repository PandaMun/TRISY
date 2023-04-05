import { configureStore } from '@reduxjs/toolkit';
import recommandSlice from '~/pages/recommand/recommandSlice';
import SurveySlice from '~/pages/Survey/SurveySlice';
import ScheduleSlice from '~/pages/recommand/left/ScheduleSlice';
import ModalSlice from '~/pages/home/components/MidSection/ModalSlice';
export const store = configureStore({
  reducer: {
    recommand: recommandSlice,
    survey: SurveySlice,
    modal: ModalSlice,
    schedule: ScheduleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
