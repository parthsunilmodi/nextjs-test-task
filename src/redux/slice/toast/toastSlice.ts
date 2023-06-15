import { createSlice } from '@reduxjs/toolkit';

type IToastType = {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const initialState: IToastType = {
  visible: false,
  message: '',
  type: 'success',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.visible = action.payload.visible;
      state.message = action.payload.message;
      state.type = action.payload.type;
    }
  },
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
