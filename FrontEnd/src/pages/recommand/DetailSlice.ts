import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~/app/store';

const initialState = {
  isOpen: false,
  imgUrl: '',
  title: '',
  desc: '',
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDModalOpen: (state: any, action: PayloadAction<any>) => {
      state.imgUrl = action.payload.imgUrl;
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.isOpen = true;
    },
    setDModalClose: (state: any) => {
      state.isOpen = false;
    },
  },
});

export const { setDModalOpen, setDModalClose } = detailSlice.actions;
export const detail = (state: RootState) => state.detail;
export default detailSlice.reducer;
