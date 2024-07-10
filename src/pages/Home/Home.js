import "./Home.scss";

import { useNavigate } from "react-router-dom";

const Home = () => {
	let navigate = useNavigate();

	const handleNavigate = (endpoint) => {
		navigate(endpoint);
	};

	return (
		<main className="center-box">
			<div className="entry-container">
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
		</main>
	);
};

export default Home;
