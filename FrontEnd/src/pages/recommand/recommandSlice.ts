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
      state.recommandList = [...action.payload];
      console.log(state.recommandList);
    },
    pickPlace: (state: any, action: PayloadAction<{ id: number }>) => {
      for (let i = 0; i < state.recommandList.length; i++) {
        if (state.recommandList[i].id === action.payload.id) {
          state.pickList = [...state.pickList, state.recommandList[i]];
          state.recommandList.splice(i, 1);
          break;
        }
      }
    },

    pickPop: (state: any, action: PayloadAction<{ id: number }>) => {
      state.pickList = [...state.pickList];
      state.recommandList = [...state.recommandList];
      for (let i = 0; i < state.pickList.length; i++) {
        if (state.pickList[i].id == action.payload.id) {
          state.recommandList = [...state.recommandList, state.pickList[i]];
          state.pickList.splice(i, 1);
          break;
        }
      }
    },
    clearPlace: (state: any) => {
      state.pickList = [];
    },
  },
});

export const { setPlace, pickPlace, pickPop, clearPlace } = recommandSlice.actions;
export const selectRecommand = (state: RootState) => state.recommand;
export default recommandSlice.reducer;
