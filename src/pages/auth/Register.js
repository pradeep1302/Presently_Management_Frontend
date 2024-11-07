import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	SET_ID,
	SET_LOGIN,
	SET_NAME,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
	name: "",
	email: "",
	password: "",
	password2: "",
	department: "",
	phone: "",
	photo: "",
};

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setformData] = useState(initialState);
	const [profileImage, setprofileImage] = useState("");
	const [role, setRole] = useState("");
	const { name, email, password, phone, password2, department, photo } =
		formData;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setformData({ ...formData, [name]: value });
	};

	const handleImageChange = (e) => {
		setprofileImage(e.target.files[0]);
	};
	const uploadImg = async () => {
		setIsLoading(true);
		try {
			// Handle Image upload
			let imageURL;
			if (
				profileImage &&
				(profileImage.type === "image/jpeg" ||
					profileImage.type === "image/jpg" ||
					profileImage.type === "image/png")
			) {
				const image = new FormData();
				image.append("file", profileImage);
				image.append("cloud_name", "dew41ssoz");
				image.append("upload_preset", "tcrjxwrg");

				// First save image to cloudinary
				const response = await fetch(
					"https://api.cloudinary.com/v1_1/dew41ssoz/image/upload",
					{ method: "post", body: image }
				);
				const imgData = await response.json();
				imageURL = imgData.url.toString();
				console.log(imageURL);
				setIsLoading(false);
				return imageURL
			}
		}catch (error) {
			setIsLoading(false);
			toast.error("An error occurred");
		}
}

	const register = async (e) => {
		e.preventDefault();
		
		try {
			var imageURL = ""
			if(profileImage)
				imageURL = await uploadImg();
			
			console.log(formData);
			console.log(profileImage);
			
			if (
				role === "teacher" &&
				(!name ||
					!email ||
					!password ||
					!password2 ||
					!department ||
					!phone)
			) {
				return toast.error("All fields are required");
			}
			if (
				role === "student" &&
				(!name ||
					!email ||
					!password ||
					!password2 ||
					!department ||
					imageURL.length===0 ||
					!phone)
			) {
				return toast.error("All fields are required");
			}
	
			if (password.length < 8) {
				return toast.error("Passwords must be up to 8 characters");
			}
			if (!validateEmail(email)) {
				return toast.error("Please enter a valid email");
			}
			if (password !== password2) {
				return toast.error("Passwords do not match");
			}

			
			const fData = {
				name,
				email,
				password,
				department,
				role,
				phone,
				photo: imageURL,
			};

			console.log(fData);
			

			const data = await registerUser(fData);
			toast.success("User Registered Successfully");
			await dispatch(SET_LOGIN(true));
			await dispatch(SET_NAME(data.name));
			dispatch(SET_ID(data._id));
			if (data.role === "teacher") navigate("/teacher");
			else navigate("/student");
			setIsLoading(false);
		} catch (error) {
			toast.error("An error occurred");
			setIsLoading(false);
		}
	};

	return (
		<div className={`container ${styles.auth}`}>
			{isLoading && <Loader />}
			<div className={styles.form}>
				<div className="--flex-center">
					<TiUserAddOutline size={35} color="#999" />
				</div>
				<h2>Register</h2>

				<form onSubmit={register}>
					<div className="container --flex-center">
						<div
							className="container --flex-center"
							style={{ fontSize: "15px" }}
						>
							<input
								type="radio"
								id="teacher"
								name="role"
								value="teacher"
								onChange={() => setRole("teacher")}
							/>
							<label htmlFor="teacher">Teacher</label>
						</div>
						<div
							className="container --flex-center"
							style={{ fontSize: "15px" }}
						>
							<input
								type="radio"
								id="student"
								name="role"
								value="student"
								onChange={() => setRole("student")}
							/>
							<label htmlFor="student">Student</label>
						</div>
					</div>

					<div style={{ display: "flex" }}>
						<input
							type="text"
							placeholder="Name"
							required
							name="name"
							value={name}
							onChange={handleInputChange}
						/>
					</div>

					<input
						type="email"
						placeholder="Email"
						required
						name="email"
						value={email}
						onChange={handleInputChange}
					/>
					<input
						type="password"
						placeholder="Password"
						required
						name="password"
						value={password}
						onChange={handleInputChange}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						required
						name="password2"
						value={password2}
						onChange={handleInputChange}
					/>
					<input
						type="text"
						placeholder="Department"
						required
						name="department"
						value={department}
						onChange={handleInputChange}
					/>
					<input
						type="text"
						placeholder="Phone"
						required
						name="phone"
						value={phone}
						onChange={handleInputChange}
					/>
					{role === "student" && (
						<>
							<label
								htmlFor="image"
								style={{
									fontSize: "1.6rem",
									fontWeight: "300",
								}}
							>
								Select an image
							</label>
							<input
								type="file"
								name="image"
								className={styles.textArea}
								onChange={(e) => handleImageChange(e)}
                required
							/>
						</>
					)}
					{role === "teacher" && (
						<>
							<label
								htmlFor="image"
								style={{
									fontSize: "1.6rem",
									fontWeight: "300",
								}}
							>
								Select an image(optional)
							</label>
							<input
								type="file"
								name="image"
								className={styles.textArea}
								onChange={(e) => handleImageChange(e)}
							/>
						</>
					)}
					<button
						type="submit"
						className="--btn --btn-primary --btn-block"
					>
						Register
					</button>
				</form>

				<span className={styles.register}>
					<Link to="/">Home</Link>
					<p> &nbsp; Already have an account? &nbsp;</p>
					<Link to="/login">Login</Link>
				</span>
			</div>
		</div>
	);
};

export default Register;
