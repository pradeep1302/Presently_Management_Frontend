import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import appointmentService from "./appointmentService";

const initialState = {
	docappointment: null,
	docappointments: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Start appointment
export const startAppointment = createAsyncThunk(
	"docappointments/start",
	async ({ formData }, thunkAPI) => {
		try {
			return await appointmentService.startAppointment(formData);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get all appointment for doctor
export const getAppointmentsDoc = createAsyncThunk(
	"docappointments/getAllDoc",
	async (formData, thunkAPI) => {
		try {
			return await appointmentService.getAppointmentsDoc(formData);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getLecture = createAsyncThunk(
	"reports/getReport",
	async (id, thunkAPI) => {
		try {
			return await appointmentService.getLecture(id);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const appointmentSlice = createSlice({
	name: "docappointment",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAppointmentsDoc.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAppointmentsDoc.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.docappointments = action.payload;
			})
			.addCase(getAppointmentsDoc.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			})
			.addCase(getLecture.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLecture.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.docappointment = action.payload;
			})
			.addCase(getLecture.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			});
	},
});

export const {} = appointmentSlice.actions;
export const selectIsLoading = (state) => state.docappointment.isLoading;
export const selectdocAppointment = (state) =>
	state.docappointment.docappointment;

export default appointmentSlice.reducer;
