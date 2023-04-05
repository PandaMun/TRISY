import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

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
      console.log('ddddddddddddddddddd');
      state.recommandList = [...action.payload];
      console.log(state.recommandList);
      console.log('ddddddddddddddddddd');
    },
    pickPlace: (state: any, action: PayloadAction<{ id: number }>) => {
      console.log('state.recommandList');
      for (let i = 0; i < state.recommandList.length; i++) {
        if (state.recommandList[i].id === action.payload.id) {
          state.pickList.push(current(state.recommandList[i]));
          state.recommandList.splice(i, 1);
          break;
        }
      }
      console.log(state.pickList);
      console.log('state.pickList');
    },

    pickPop: (state: any, action: PayloadAction<any>) => {
      if (state.pickList.includes(action.payload)) {
        state.pickList = state.pickList.filter((i: any) => i !== action.payload);
      }
    },
  },
});

export const { setPlace, pickPlace, pickPop } = recommandSlice.actions;
export const selectRecommand = (state: RootState) => state.recommand;
export default recommandSlice.reducer;
