import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	SET_LOGIN,
	SET_ROLE,
	selectIsLoggedIn,
	selectRole,
} from "../../redux/features/auth/authSlice";
import AppointmentListDoc from "../../components/appointment/appointmentList/AppointmentListDoc";
import AppointmentSummary from "../../components/appointment/appointmentSummary/AppointmentSummary";
import { getAppointmentsDoc } from "../../redux/features/appointmentDoc/appointmentSlice";
import { getLoginStatus, getUser } from "../../services/authService";
import { toast } from "react-toastify";
import axios from "axios";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import AppointmentSummaryDoc from "../../components/appointment/appointmentSummary/AppointmentSummaryDoc";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/lectures`;

const initialState = {
	date: new Date(),
};

const Teacher = () => {
	useRedirectLoggedOutUser("/login");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [formData, setformData] = useState(initialState);
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const role = useSelector(selectRole);
	const { docappointments, isLoading, isError, message } = useSelector(
		(state) => state.docappointment
	);

	useEffect(() => {
		if (role !== "teacher") {
			navigate("/");
			return;
		}
		if (isLoggedIn === true) {
			dispatch(getAppointmentsDoc(formData));
		}

		if (isError) {
			console.log(message);
		}
	}, [isLoggedIn, isError, message, role, formData, dispatch]);

	return (
		<div>
			<AppointmentSummaryDoc />
			<AppointmentListDoc
				formData={formData}
				setformData={setformData}
				appointments={docappointments}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default Teacher;
