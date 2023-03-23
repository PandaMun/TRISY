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
    setPlace: (state: any, action: PayloadAction<{ place: [] }>) => {
      state.recommandList = action.payload.place;
      console.log(state.recommandList);
    },
    pickPlace: (state: any, action: PayloadAction<{ id: number }>) => {
      for (let i = 0; i < state.recommandList.length; i++) {
        if (state.recommandList[i].id === action.payload.id) {
          state.pickList.push(state.recommandList.splice(i, 1)[0]);
          break;
        }
      }
    },
    // pickPlace: (state: any) =>{
    //   state.
    // }
  },
});

export const { setPlace, pickPlace } = recommandSlice.actions;
export const selectRecommand = (state: RootState) => state.recommand;
export default recommandSlice.reducer;
