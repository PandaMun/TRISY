import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~/app/store';
import { PickList } from './left/PickList';

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
      console.log(state.pickList);
    },

    pickPop: (state: any, action: PayloadAction<{ id: number }>) => {
      console.log('체크픽팝');
      state.pickList = [...state.pickList];
      state.recommandList = [...state.recommandList];
      console.log(state.pickList);
      console.log(action.payload);
      for (let i = 0; i < state.pickList.length; i++) {
        if (state.pickList[i].id == action.payload.id) {
          state.recommandList = [...state.recommandList, state.pickList[i]];
          state.pickList.splice(i, 1);
          break;
        }
      }
      // if (state.pickList.includes(action.payload)) {
      // state.pickList = [...state.pickList.filter((i: any) => i !== action.payload)];

      // }

      console.log('state.pickList');
      console.log(state.pickList);
      console.log(state.recommandList);
    },
  },
});

export const { setPlace, pickPlace, pickPop } = recommandSlice.actions;
export const selectRecommand = (state: RootState) => state.recommand;
export default recommandSlice.reducer;
