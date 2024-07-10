import "./Signup.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
	const [errors, setErrors] = useState({});
	const [formValues, setFormValues] = useState({
		first_name: "",
		email: "",
		password: "",
		password_confirm: "",
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
		if (!formValues.first_name) formErrors.first_name = true;
		if (!formValues.email) formErrors.email = true;
		if (!emailRegex.test(formValues.email)) formErrors.invalid_email = true;
		if (!formValues.password) formErrors.password = true;
		if (!formValues.password_confirm) formErrors.password_confirm = true;
		setErrors(formErrors);

		if (Object.keys(formErrors).length === 0) {
			// No errors, form is valid
			axios
				.post("http://localhost:8080/user/register", formValues)
				.then((response) => {
					console.log(response.data);
					localStorage.setItem("authToken", response.data.token);
					navigate("/list");
				})
				.catch((err) => {
					console.log(err);
					if (err.response.status === 409) {
						return setErrors({
							...errors,
							taken_email: true,
						});
					}
				});
		}
	};

	return (
		<div className="center-box">
			<div className="form-container">
				<h1>Signup</h1>
				<form className="entry-form" onSubmit={handleSubmit}>
					<input
						type="text"
						name="first_name"
						className="entry-form__input"
						onChange={handleChangeState}
						value={formValues.first_name}
						placeholder="First name"></input>
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
					<input
						type="password"
						name="password_confirm"
						className="entry-form__input"
						onChange={handleChangeState}
						value={formValues.password_confirm}
						placeholder="Confirm password"></input>
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
