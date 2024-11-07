import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/lectures/`;

// Start Appointment
const startAppointment = async (formData) => {
	const response = await axios.post(`${API_URL}/start/`, formData);
	return response.data;
};

// Get all appointment for Doctor
const getAppointmentsDoc = async (formData) => {
	const response = await axios.post(
		`${API_URL}/getlectures/teacher/`,
		formData
	);
	return response.data;
};

const getLecture = async (id) => {
	const response = await axios.get(`${API_URL}/getlecture/` + id);
	return response.data;
};

const appointmentService = {
	getAppointmentsDoc,
	startAppointment,
	getLecture,
};

export default appointmentService;
