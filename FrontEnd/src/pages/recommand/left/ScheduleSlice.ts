import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~/app/store';
interface spotInfo {
  spotId: number;
  spotName: string;
  planDate: number;
}
const initialState = {
  tourName: '여행명',
  location: '광주',
  startDate: '2023-04-07',
  endDate: '2023-04-10',
  spotInfoList: [{ spotId: 1, spotName: '목포식당', planDate: 1 }],
};

const ScheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setLocation: (state: any, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setStartDate: (state: any, action: PayloadAction<Date>) => {
      const year = action.payload.getFullYear();
      const month = action.payload.getMonth() + 1;
      const day = action.payload.getDate();
      const startDate = `${year}년 ${month}월 ${day}일`;
      state.startDate = startDate;
    },
    setEndtDate: (state: any, action: PayloadAction<Date>) => {
      const year = action.payload.getFullYear();
      const month = action.payload.getMonth() + 1;
      const day = action.payload.getDate();
      const setEndtDate = `${year}년 ${month}월 ${day}일`;
      state.setEndtDate = setEndtDate;
    },
    setspotInfoList: (state: any, action: PayloadAction<spotInfo>) => {
      const id = action.payload.spotId;
      const name = action.payload.spotName;
      const date = action.payload.planDate;
      state.spotInfoList = [...state.spotInfoList, { spotId: id, spotName: name, planDate: date }];
    },
  },
});

export const { setLocation, setStartDate, setEndtDate, setspotInfoList } = ScheduleSlice.actions;
export const schedule = (state: RootState) => state.schedule;
export default ScheduleSlice.reducer;
