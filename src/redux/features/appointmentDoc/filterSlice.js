import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtereddoc: [],
};

const filterSlice = createSlice({
  name: "docfilter",
  initialState,
  reducers: {
    FILTER_DOC(state, action) {
      const { appointments, search } = action.payload;
      const tempdoc = appointments.filter(
        (appointment) =>
          appointment.subject.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          appointment.subject.subjectCode
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          appointment.subject.department
            .toLowerCase()
            .includes(search.toLowerCase())
      );

      state.filtereddoc = tempdoc;
    },
  },
});

export const { FILTER_DOC } = filterSlice.actions;

export const selectFiltereddoc = (state) => state.docfilter.filtereddoc;

export default filterSlice.reducer;
