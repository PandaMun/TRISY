import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '~/app/store';

const initialState = {
  isOpen: false,
};

const ModalSlice = createSlice({
  name: 'recommand',
  initialState,
  reducers: {
    setModalOpen: (state: any) => {
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
