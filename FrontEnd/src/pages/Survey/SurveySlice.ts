import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~/app/store';

const initialState = {
  surveyPick: '',
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    pick: (state: any, action: PayloadAction<string>) => {
      state.surveyPick += action.payload;
    },
  },
});

export const { pick } = surveySlice.actions;
export const SurveyResult = (state: RootState) => state.survey;
export default surveySlice.reducer;
