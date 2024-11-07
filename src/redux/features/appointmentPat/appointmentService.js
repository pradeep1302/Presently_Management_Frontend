import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/lectures/`;

// Create New Appointment
const createAppointment = async (formData) => {
	const response = await axios.post(`${API_URL}/create/`, formData);
	return response.data;
};

// Get all appointment for patient
const getAppointmentsPat = async (formData) => {
	const response = await axios.post(
		`${API_URL}/getlectures/student/`,
		formData
	);
	return response.data;
};

// Get all appointment for Doctor
const getAppointmentsDoc = async (formData) => {
	const response = await axios.post(
		`${API_URL}/get-appointments/doctor/`,
		formData
	);
	return response.data;
};

// Update status
const updateStatus = async (id, formData) => {
	const response = await axios.patch(
		`${API_URL}/update-status/${id}`,
		formData
	);
	return response.data;
};

const appointmentService = {
	getAppointmentsDoc,
	getAppointmentsPat,
	createAppointment,
	updateStatus,
};

export default appointmentService;
