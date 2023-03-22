import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~/app/store';

const initialState = {
  pickList: [],
  recommandList: [],
};

const recommandSlice = createSlice({
  name: 'recommand',
  initialState,
  reducers: {
    setPlace: (state: any, action: PayloadAction<any>) => {
      state.recommandList = action.payload;
      console.log(state.recommandList);
    },
    // pickPlace: (state: any) =>{
    //   state.
    // }
  },
});

export const { setPlace } = recommandSlice.actions;
export const selectRecommand = (state: RootState) => state.recommand;
export default recommandSlice.reducer;
