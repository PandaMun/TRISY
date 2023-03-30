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
      console.log(state.surveyPick);
    },
  },
});

export const { pick } = surveySlice.actions;
export const selectRecommand = (state: RootState) => state.recommand;
export default surveySlice.reducer;
