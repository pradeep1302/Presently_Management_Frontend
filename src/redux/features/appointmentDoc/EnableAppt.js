import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./enableApt.css";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
	SET_ID,
	SET_LOGIN,
	selectId,
	selectIsLoggedIn,
	selectRole,
} from "../auth/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { getLoginStatus, getUser } from "../../../services/authService";
import { SpinnerImg } from "../../../components/loader/Loader";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/subjects`;

export default function EnableAppt() {
	useRedirectLoggedOutUser("/login");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const id = useSelector(selectId);
	const role = useSelector(selectRole);

	const [subjectName, setSubjectName] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [subjectCode, setSubjectCode] = useState(null);
	const [maxSize, setmaxSize] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (role !== "teacher") {
			navigate("/teacher");
			return;
		}
		if (isLoggedIn === true) {
			getSubject();
		}
	}, [dispatch, navigate, role, isLoggedIn, subjectCode]);
	const getSubject = async () => {
		setIsLoading(true);
		try {
			const formData = {
				subjectCode,
			};
			const { data } = await axios.post(
				`${API_URL}/getSubject/`,
				formData
			);
			if (!data) {
				setmaxSize(0);
				setSubjectName("");
				setDisabled(false)
			} else {
				if (data.teacher === id)
					setDisabled(false)
				else
					setDisabled(true)
				setmaxSize(data.maxSize);
				setSubjectName(data.name);
			}
			setIsLoading(false);
		} catch (error) {
			toast.error(error.message);
			setIsLoading(false);
		}
	};

	const register = async (e) => {
		const formData = {
			subjectCode,
			name: subjectName,
			maxSize,
		};
		e.preventDefault();
		if (!formData.subjectCode || !formData.name || !formData.maxSize) {
			return toast.error("All fields are required");
		}
		setIsLoading(true);
		try {
			const { data } = await axios.post(`${API_URL}/start/`, formData);
			if (data) toast.success("Subject created");
			else {
				toast.error(data.message);
			}
			getSubject();
			setIsLoading(false);
			setSubjectCode(null);
			setSubjectName(null);
			setmaxSize(null);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			toast.error(message);
			setIsLoading(false);
			return false;
		}
	};
	const handleCodeChange = (e) => {
		setSubjectCode(e.target.value);
	};
	const handleNameChange = (e) => {
		setSubjectName(e.target.value);
	};
	const handleInputChange = (e) => {
		setmaxSize(e.target.value);
	};

	return (
		<>
			{isLoading && <SpinnerImg />}
			<div style={{ width: "350px" }}>
				<form onSubmit={register}>
					<label
						htmlFor="code"
						style={{ fontSize: "20px" }}
						className="form-label"
					>
						Subject Code
					</label>
					<input
						type="text"
						className="form-control"
						id="code"
						value={subjectCode}
						onChange={handleCodeChange}
						style={{ fontSize: "20px", width: "200px" }}
					/>
					<label
						htmlFor="name"
						style={{ fontSize: "20px" }}
						className="form-label"
					>
						Subject Name
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={subjectName}
						onChange={handleNameChange}
						style={
							subjectName
								? {
										fontSize: "20px",
										width: "200px",
								  }
								: {
										fontWeight: "200",
										fontSize: "20px",
										width: "200px",
								  }
						}
						placeholder="No subject"
					/>
					<label
						htmlFor="maxlimit"
						className="form-label"
						style={{ fontSize: "20px" }}
					>
						Maximum Students
					</label>
					<input
						type="text"
						className="form-control"
						id="maxlimit"
						value={maxSize}
						onChange={handleInputChange}
						style={
							maxSize
								? {
										fontSize: "20px",
										width: "200px",
								  }
								: {
										fontWeight: "200",
										fontSize: "20px",
										width: "200px",
								  }
						}
					/>
					<button
						className="btn btn-primary btn-lg"
						style={{ marginTop: "20px" }}
						type="submit"
						disabled={disabled}
					>
						Make Changes
					</button>
				</form>
			</div>
		</>
	);
}
