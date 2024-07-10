import "./Login.scss";

import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="center-box">
			<div className="form-container">
				<h1>Login</h1>
				<form className="entry-form">
					<input
						type="text"
						name="emailInput"
						id="emailInput"
						className="entry-form__input"
						// onChange={handleChangeComment}
						// value={comment}
						placeholder="Enter your email"></input>
					<input
						type="text"
						name="passwordInput"
						id="passwordInput"
						className="entry-form__input"
						// onChange={handleChangeComment}
						// value={comment}
						placeholder="Enter your password"></input>
					<button className="button button--entry" type="submit">
						Login
					</button>
				</form>
				<p>
					Don't have an account? <Link to="/signup">Signup</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
