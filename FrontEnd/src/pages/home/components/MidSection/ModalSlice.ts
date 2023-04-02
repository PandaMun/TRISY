import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~/app/store';

interface ModalPayload {
  imgUrl?: string;
  title?: string;
  body?: string;
  range?: number;
  startDate?: any;
  endDate?: any;
}
const initialState = {
  isOpen: false,
  imgUrl: '/image-coming-soon.png',
  spotTitle: 'TRiSY',
  body: 'Please Wait Some Seconds...',
  range: 2,
  startDate: '',
  endDate: '',
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
    setModalRange: (state: any, action: PayloadAction<ModalPayload>) => {
      state.range = action.payload.range;
    },
    setDate: (state: any, action: PayloadAction<ModalPayload>) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export const { setModalOpen, setModalClose, setModalRange, setDate } = ModalSlice.actions;
export const ModalState = (state: RootState) => state.modal;
export default ModalSlice.reducer;
