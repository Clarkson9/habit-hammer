import "./Header.scss";

import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "../../assets/logo/habit-hammer.svg";

const Header = () => {
	let navigate = useNavigate();
	const location = useLocation();

	const handleLogout = (endpoint) => {
		localStorage.removeItem("authToken");
		navigate(endpoint);
	};

	return location.pathname.includes("list") ? (
		<div className="header">
			<Link className="logo" to="/">
				<img className="logo-icon" src={logo} alt="Habit hammer logo" /> Habit
				Hammer
			</Link>
			<button
				type="button"
				className="button"
				onClick={() => handleLogout("/")}>
				<p className="button__text">Logout</p>
			</button>
		</div>
	) : (
		<div className="header">
			<Link className="logo" to="/">
				<img className="logo-icon" src={logo} alt="Habit hammer logo" />
				Habit Hammer
			</Link>
		</div>
	);
};

export default Header;
