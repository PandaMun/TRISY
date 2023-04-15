import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~/app/store';
interface spotInfo {
  spotId: number;
  spotName: string;
  planDate: number;
}
const initialState = {
  tourName: '여행명',
  location: '제주도',
  startDate: '2023-04-07',
  endDate: '2023-04-10',
  spotInfoList: [],
  isOpen: false,
};

const ScheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setLocation: (state: any, action: PayloadAction<{ location: string | undefined }>) => {
      state.location = action.payload.location;
    },
    setStartDate: (state: any, action: PayloadAction<string>) => {
      const dateObject = new Date(action.payload);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      state.startDate = formattedDate;
    },
    setEndtDate: (state: any, action: PayloadAction<string>) => {
      const dateObject = new Date(action.payload);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      state.setEndtDate = formattedDate;
    },
    setspotInfoList: (state: any, action: PayloadAction<spotInfo>) => {
      const id = action.payload.spotId;
      const name = action.payload.spotName;
      const date = action.payload.planDate;
      const newSpotInfoList = [
        ...state.spotInfoList,
        { spotId: id, spotName: name, planDate: date },
      ];
      state.spotInfoList = newSpotInfoList;
      console.log('스팟인포 리스트');
    },
    setModalOpen: (state: any) => {
      state.isOpen = true;
    },
    setModalClose: (state: any) => {
      state.isOpen = false;
    },
    setSpotInfoClear: (state: any) => {
      state.spotInfoList = [];
      console.log('클리어');
      console.log(current(state));
    },
  },
});

export const {
  setLocation,
  setStartDate,
  setEndtDate,
  setspotInfoList,
  setModalOpen,
  setModalClose,
  setSpotInfoClear,
} = ScheduleSlice.actions;
export const schedule = (state: RootState) => state.schedule;
export default ScheduleSlice.reducer;
