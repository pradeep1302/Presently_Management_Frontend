import React, { useEffect, useState } from "react";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../../../services/authService";
import { Link, useParams } from "react-router-dom";
import { SET_PAT, selectRole } from "../../../redux/features/auth/authSlice";
import { SpinnerImg } from "../../loader/Loader";
import Card from "../../card/Card";
import { toast } from "react-toastify";

const ReportSummary = ({ docappointment }) => {
	useRedirectLoggedOutUser("/login");

	return (
		<div className="profile --my2">
			<>
				<Card cardClass={"card --flex-dir-column"}>
					<span className="profile-data">
						<p>
							<b>Subject Code : </b>{" "}
							{docappointment?.subject.subjectCode}
						</p>
						<p>
							<b>Subject Name : </b>{" "}
							{docappointment?.subject.name}
						</p>
						<p>
							<b>Department : </b>{" "}
							{docappointment?.subject.department}
						</p>
						<p>
							<b>Teacher Name : </b>{" "}
							{docappointment?.teacher.name}
						</p>
						<p>
							<b>Teacher Email : </b>{" "}
							{docappointment?.teacher.email}
						</p>
						<p>
							<b>Teacher Phone : </b>{" "}
							{docappointment?.teacher.phone}
						</p>
					</span>
				</Card>
			</>
		</div>
	);
};

export default ReportSummary;
