import React from "react";
import heroImg from "../../assets/hero.png";
import navImg from "../../assets/icon.png";
import "./Home.scss";
import { Link } from "react-router-dom";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import { useSelector } from "react-redux";
import { selectRole } from "../../redux/features/auth/authSlice";
import SearchBar from "../../components/searchBar/SearchBar";
import { GoChevronDown } from "react-icons/go";
import queue from "../../assets/queue.png";
import paperWork from "../../assets/paperWork.jpg";
import doctor from "../../assets/doctor.jpg";

export default function Home() {
  const role = useSelector(selectRole);
  return (
    <div className="wrapper">
      <section className="home">
        <nav className="container --flex-between">
          <div className="logo">
            <img src={navImg} alt="navImg" className="navImg" />
            <span className="nav-text">Presently</span>
          </div>

          <ul className="home-links --flex-between">
            <ShowOnLogout>
              <li>
                <button type="button" className="btn btn-outline-primary">
                  <Link to="/register">Register</Link>
                </button>
              </li>
            </ShowOnLogout>
            <ShowOnLogout>
              <li>
                <button type="button" className="btn btn-primary">
                  <Link to="/login">Login</Link>
                </button>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <button className="--btn --btn-primary">
                  <Link to={`/${role}`}>Dashboard</Link>
                </button>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>
      </section>
    </div>
  );
}
