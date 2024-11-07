import React, { useEffect, useState } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
	SET_LOGIN,
	SET_NAME,
	SET_USER,
	selectIsLoggedIn,
	selectRole,
} from "../../redux/features/auth/authSlice";
import { getDoctor, getLoginStatus, getUser } from "../../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerImg } from "../../components/loader/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import Dropdown from "../../components/dropdown/Dropdown";
import Button from "@mui/material/Button";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/subjects`;

export default function BookAppointment() {
	useRedirectLoggedOutUser("/login");

	const [searchData, setSearchData] = useState([]);
	const fetchData = async () => {
		try {
			const { data } = await axios.get(`${API_URL}/getallsubjects`);
			setSearchData(data);
		} catch (error) {
			toast.error(error.message);
		}
	};
	// const handleChange = (value) => {
	// 	setSearch(value);
	// 	fetchData(value);
	// };

	const handleDropdownClick = (code) => {
		setSubjectCode(code);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const role = useSelector(selectRole);
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const [subjectCode, setSubjectCode] = useState(null);
	const [profile, setProfile] = useState(null);
	const [doctor, setDoctor] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);

	const register = async (e) => {
		console.log("Clicked");
		e.preventDefault();
		if (!subjectCode) {
			return toast.error("All fields are required");
		}
		setIsLoading(true);
		try {
			const { data } = await axios.post(`${API_URL}/enroll`, {
				subjectCode,
			});
			if (data === true) toast.success("Enrollment successful");
			else {
				toast.error(data.message);
			}
			navigate("/student");
			setIsLoading(false);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			setIsLoading(false);
			return false;
		}
	};

	useEffect(() => {
		if (role !== "student") {
			navigate("/");
			return;
		}

		if (isLoggedIn === true) {
			fetchData();
		}
	}, [isLoggedIn, role]);
	useEffect(() => {
		getSubject(subjectCode)
	}, [subjectCode]);
	
	const getSubject = async (id) => {
		setIsLoading(true);
		try {
			const { data } = await axios.post(`${API_URL}/getsubject`, {
				subjectCode,
			});
			
			if (!data) setDisabled(true);
			else if (data.currentSize < data.maxSize) setDisabled(false);
			else {
				setDisabled(true);
				toast.error("Student Limit Reached");
			}
			setIsLoading(false);
		} catch (error) {
			toast.error(error.message);
			setIsLoading(false);
		}
	};
	return (
    <>
      <Dropdown subjects={searchData} setSubjectCode={setSubjectCode} />
			<div className="my-3">

				<Button variant="contained" disabled={disabled} onClick={register}>
        Register
      </Button>
			</div>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
				<div className="col-md-7 col-lg-8" style={{ fontSize: "20px" }}>
					<h4 className="mb-3">Book Appointment</h4>
					<>
						{profile === null || doctor === null ? (
							<></>
						) : (
							<form onSubmit={register}>
								<div className="row g-3">
									<div>
										<label
											htmlFor="firstName"
											className="form-label"
										>
											Patient Name
										</label>
										<input
											type="text"
											className="form-control"
											id="firstName"
											placeholder={profile.name}
											value=""
											style={{ fontSize: "20px" }}
											disabled
										/>
									</div>
									<div className="col-12">
										<label
											htmlFor="dob"
											className="form-label"
										>
											DOB
										</label>
										<input
											type="string"
											className="form-control"
											id="dob"
											placeholder={profile.dob}
											style={{ fontSize: "20px" }}
											disabled
										/>
									</div>

									<div className="col-12">
										<label
											htmlFor="phone"
											className="form-label"
										>
											Phone
										</label>
										<div className="input-group has-validation">
											<span
												className="input-group-text"
												style={{ fontSize: "20px" }}
											>
												+91
											</span>
											<input
												type="number"
												className="form-control"
												id="phone"
												placeholder={profile.phone}
												style={{ fontSize: "20px" }}
												disabled
											/>
										</div>
									</div>

									<div className="col-12">
										<label
											htmlFor="email"
											className="form-label"
										>
											Email
										</label>
										<input
											type="email"
											className="form-control"
											id="email"
											placeholder={profile.email}
											style={{ fontSize: "20px" }}
											disabled
										/>
									</div>

									<div className="col-12">
										<label
											htmlFor="address"
											className="form-label"
										>
											Address
										</label>
										<input
											type="text"
											className="form-control"
											id="address"
											placeholder={profile.address}
											style={{ fontSize: "20px" }}
											disabled
										/>
									</div>
									<div className="col-12">
										<label
											htmlFor="doctor"
											className="form-label"
										>
											Doctor
										</label>
										<input
											type="text"
											className="form-control"
											id="doctor"
											placeholder={doctor.name}
											style={{ fontSize: "20px" }}
											disabled
										/>
									</div>
									<div
										className="col-12"
										style={{ marginTop: "25px" }}
									>
										<DatePicker
											label="Choose a Date"
											minDate={dayjs(new Date())}
											sx={{
												label: {
													fontSize: "15px",
													backgroundColor: "white",
													padding: "0px 10px",
												},
												div: {
													fontSize: "20px",
												},
											}}
											value={dayjs(formData.date)}
											onChange={(newValue) =>
												setformData({
													...formData,
													date: newValue.$d,
												})
											}
											format="DD/MM/YYYY"
										/>
										{status && (
											<p style={{ color: "green" }}>
												Available
											</p>
										)}
										{!status && (
											<p style={{ color: "red" }}>
												Not Available
											</p>
										)}
									</div>
								</div>

								<hr className="my-4" />

								<button
									className="w-100 btn btn-primary btn-lg"
									type="submit"
								>
									Book Appointment
								</button>
							</form>
						)}
					</>
				</div>
			</LocalizationProvider> */}
    </>
  );
}
