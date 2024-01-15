import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

type FormData = {
  formData: any;
};

const initialState: FormData = {
  formData: {},
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    // setUser: (state, action) => {
    //   state.user = action.payload;
    // },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    updateFormData: (state, action) => {
      const {payload} = action;
      // @ts-ignore
      state.formData[payload.field] = payload.value;
    },
  },
});

export const {updateFormData, setFormData} = formDataSlice.actions;

export const selectFormData = (state: RootState) => state.formData.formData;

export default formDataSlice.reducer;
