import "./HabitList.scss";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Habit from "../../components/Habit/Habit.js";

const HabitList = () => {
	const [habitList, setHabitList] = useState([]);
	const [errors, setErrors] = useState({});
	const [formValues, setFormValues] = useState({
		habit_name: "",
		habit_why: "",
	});

	const navigate = useNavigate();

	const token = localStorage.getItem("authToken");
	useEffect(() => {
		axios
			.get("http://localhost:8080/habit", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => console.log(response.data));
	}, []);

	const addHabitModal = useRef(null);
	const editHabitModal = useRef(null);

	const toggleModal = (ref) => {
		ref.current.hasAttribute("open")
			? ref.current.close()
			: ref.current.showModal();
	};

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

	const handleAddHabit = (event) => {
		event.preventDefault();

		let formErrors = {};
		if (!formValues.habit_name) formErrors.habit_name = true;
		if (!formValues.habit_why) formErrors.habit_why = true;
		setErrors(formErrors);

		if (Object.keys(formErrors).length === 0) {
			// No errors, form is valid
			axios
				.post("http://localhost:8080/habit", formValues, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log(response.data);
					toggleModal(addHabitModal);
					// navigate("/list");
				})
				.catch((err) => {
					console.log(err);
					// if (err.response.status === 400) setWrongPassword(true);
				});
		}
	};

	return (
		<main className="center-box">
			{/* <Habit /> */}

			{/* on click trigger modal */}
			<button
				type="button"
				className="button"
				onClick={() => toggleModal(addHabitModal)}>
				+ Add a new habit
			</button>
			{/* <button
				type="button"
				className="button"
				onClick={() => toggleModal(editHabitModal)}>
				+ Temp edit
			</button> */}
			<dialog
				className="habit-modal"
				ref={addHabitModal}
				onClick={(e) => {
					if (e.currentTarget === e.target) {
						toggleModal(addHabitModal);
					}
				}}>
				<form className="modal-form" onSubmit={handleAddHabit}>
					<h2>Add a new habit to your list</h2>
					<input
						type="text"
						name="habit_name"
						className="modal-form__input"
						onChange={handleChangeState}
						value={formValues.habit_name}
						placeholder="Habit"></input>
					<input
						type="text"
						name="habit_why"
						className="modal-form__input"
						onChange={handleChangeState}
						value={formValues.habit_why}
						placeholder="Why"></input>
					<div className="button-wrapper">
						<button type="button" onClick={() => toggleModal(addHabitModal)}>
							Cancel
						</button>
						<button type="submit">+ Add new habit</button>
					</div>
				</form>
			</dialog>
			<dialog
				className="habit-modal"
				ref={editHabitModal}
				onClick={(e) => {
					if (e.currentTarget === e.target) {
						toggleModal(editHabitModal);
					}
				}}>
				<form className="modal-form">
					<h2>Edit Habit</h2>
					<input
						type="text"
						name="habit_name"
						className="modal-form__input"
						onChange={handleChangeState}
						value={formValues.habit_name}
						placeholder="Habit"></input>
					<input
						type="text"
						name="habit_why"
						className="modal-form__input"
						onChange={handleChangeState}
						value={formValues.habit_why}
						placeholder="Why"></input>
					<div className="button-wrapper">
						<button type="button" onClick={() => toggleModal(addHabitModal)}>
							Cancel
						</button>
						<button type="submit">Save</button>
					</div>
				</form>
			</dialog>
		</main>
	);
};

export default HabitList;
