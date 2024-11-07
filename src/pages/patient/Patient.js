import React, { useEffect, useState } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	selectIsLoggedIn,
	selectRole,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import AppointmentSummary from "../../components/appointment/appointmentSummary/AppointmentSummary";
import AppointmentListPat from "../../components/appointment/appointmentList/AppointmentListPat";
import AppointmentListDoc from "../../components/appointment/appointmentList/AppointmentListDoc";
import { getAppointmentsPat } from "../../redux/features/appointmentPat/appointmentSlice";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/lectures`;

const initialState = {
	date: new Date(),
};

const Patient = () => {
	useRedirectLoggedOutUser("/login");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const role = useSelector(selectRole);
	const [formData, setformData] = useState(initialState);

	const isLoggedIn = useSelector(selectIsLoggedIn);
	const { patappointments, isLoading, isError, message } = useSelector(
		(state) => state.patappointment
	);
	useEffect(() => {
		if (role !== "student") {
			navigate("/");
			return;
		}

		if (isLoggedIn === true) {
			dispatch(getAppointmentsPat(formData));
		}

		if (isError) {
			console.log(message);
		}
	}, [isLoggedIn, isError, message, role, formData, dispatch]);
	return (
		<div>
			<AppointmentSummary />
			<AppointmentListDoc
				formData={formData}
				setformData={setformData}
				appointments={patappointments}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default Patient;
