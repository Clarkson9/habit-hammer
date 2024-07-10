import "./Login.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [errors, setErrors] = useState({});
	const [wrongPassword, setWrongPassword] = useState(false);
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChangeState = (event) => {
		const { name, value } = event.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
		setErrors({
			...errors,
			[name]: "",
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// email validation
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		let formErrors = {};
		if (!formValues.email) formErrors.email = true;
		if (!emailRegex.test(formValues.email)) formErrors.invalid_email = true;
		if (!formValues.password) formErrors.password = true;
		setErrors(formErrors);

		if (Object.keys(formErrors).length === 0) {
			// No errors, form is valid
			axios
				.post("http://localhost:8080/user/login", formValues)
				.then((response) => {
					console.log(response.data);
					localStorage.setItem("authToken", response.data.token);
					navigate("/list");
				})
				.catch((err) => {
					console.log(err);
					if (err.response.status === 400) setWrongPassword(true);
				});
		}
	};

	return (
		<div className="center-box">
			<div className="form-container">
				<h1>Login</h1>
				<form className="entry-form" onSubmit={handleSubmit}>
					<input
						type="text"
						name="email"
						className="entry-form__input"
						onChange={handleChangeState}
						value={formValues.email}
						placeholder="Email"></input>
					<input
						type="password"
						name="password"
						className="entry-form__input"
						onChange={handleChangeState}
						value={formValues.password}
						placeholder="Password"></input>
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
