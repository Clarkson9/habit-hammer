import "./Header.scss";

import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
	let navigate = useNavigate();
	const location = useLocation();

	const handleLogout = (endpoint) => {
		localStorage.removeItem("authToken");
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
					onClick={() => handleLogout("/")}>
					<p className="button__text">Logout</p>
				</button>
			</div>
		</div>
	) : (
		<div className="header">
			<Link to="/">Habit Hammer</Link>
		</div>
	);
};

export default Header;
