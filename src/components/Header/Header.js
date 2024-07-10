import "./Header.scss";

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
	let navigate = useNavigate();

	const handleNavigate = (endpoint) => {
		navigate(endpoint);
	};

	return (
		<div className="header">
			<Link to="/">Habit Hammer</Link>
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
		</div>
	);
};

export default Header;
