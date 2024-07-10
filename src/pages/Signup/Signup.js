import "./Signup.scss";

import { Link } from "react-router-dom";

const Signup = () => {
	return (
		<div className="center-box">
			<div className="form-container">
				<h1>Signup</h1>
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
					<input
						type="text"
						name="confirmPasswordInput"
						id="confirmPasswordInput"
						className="entry-form__input"
						// onChange={handleChangeComment}
						// value={comment}
						placeholder="Confirm your password"></input>
					<button className="button button--entry" type="submit">
						Signup
					</button>
				</form>
				<p>
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
