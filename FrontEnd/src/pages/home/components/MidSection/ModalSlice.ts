import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~/app/store';

interface ModalPayload {
  imgUrl: string;
  title: string;
  body: string;
}
const initialState = {
  isOpen: false,
  imgUrl: '/image-coming-soon.png',
  spotTitle: 'TRiSY',
  body: 'Please Wait Some Seconds...',
};
const ModalSlice = createSlice({
  name: 'recommand',
  initialState,
  reducers: {
    setModalOpen: (state: any, action: PayloadAction<ModalPayload>) => {
      state.imgUrl = action.payload.imgUrl;
      state.spotTitle = action.payload.title;
      state.body = action.payload.body;
      state.isOpen = true;
    },
    setModalClose: (state: any) => {
      state.isOpen = false;
    },
  },
});

export const { setModalOpen, setModalClose } = ModalSlice.actions;
export const ModalState = (state: RootState) => state.modal;
export default ModalSlice.reducer;
