import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AppointmentSummary() {
  const navigate = useNavigate();
  const handleClick = () => {
    toast.info("Enter details of subject");
    navigate("/enroll");
  };
  return (
    <button className="--btn --btn-primary" onClick={handleClick}>
      Enroll subject
    </button>
  );
}
