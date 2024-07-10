import "./Header.scss";

import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
	let navigate = useNavigate();
	const location = useLocation();

	const handleNavigate = (endpoint) => {
		navigate(endpoint);
	};

	// ***** add handleLogout function *****

	return location.pathname.includes("list") ? (
		<div>
			<div className="header">
				<Link to="/">Habit Hammer</Link>
				<button
					type="button"
					className="button"
					onClick={() => handleNavigate("/")}>
					<p className="button__text">Logout</p>
				</button>
			</div>
		</div>
	) : (
		<div className="header">
			<Link to="/">Habit Hammer</Link>
			{/* <div className="button-wrapper">
				<button
					type="button"
					className="button"
					onClick={() => handleNavigate("/signup")}>
					<p className="button__text">Signup</p>
				</button>
				<button
					type="button"
					className="button"
					onClick={() => handleNavigate("/login")}>
					<p className="button__text">Login</p>
				</button> 
			</div>*/}
		</div>
	);
};

export default Header;
