import "./Habit.scss";

import { useState, useRef } from "react";
import axios from "axios";

const Habit = ({
	habit,
	handleDeleteHabit,
	handleCompleteHabit,
	toggleModal,
	updateHabitList,
}) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [formValues, setFormValues] = useState({
		habit_name: "",
		habit_why: "",
	});

	console.log(habit);
	const editHabitModal = useRef(null);
	const token = localStorage.getItem("authToken");

	const handleChangeState = (event) => {
		const { name, value } = event.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleEditHabit = (event, id) => {
		event.preventDefault();

		axios
			.put(`http://localhost:8080/habit/${id}`, formValues, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				axios
					.get("http://localhost:8080/habit", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((response) => {
						updateHabitList(response.data);
					});
				toggleModal(editHabitModal);
			})
			.catch((err) => {
				console.log(err);
				// if (err.response.status === 400) setWrongPassword(true);
			});
	};

	function isToday(timestamp) {
		// Parse the given timestamp
		const date = new Date(timestamp);

		// Get the current date
		const today = new Date();

		// Check if the year, month, and date are the same
		return (
			date.getFullYear() === today.getFullYear() &&
			date.getMonth() === today.getMonth() &&
			date.getDate() === today.getDate()
		);
	}

	// useEffect(() => {
	// 	// Check if the timestamp is from today and update the state
	// 	setIsDisabled(isToday(habit.last_complete));
	// }, []);

	return (
		<div className="habit">
			<button
				className="delete-button"
				type="button"
				onClick={() => handleDeleteHabit(habit.id)}>
				Delete
			</button>
			<div className="habit-details">
				<div className="habit-details__name">
					<p>Habit: {habit.habit_name}</p>
					{/* <p>Example habit name</p> */}
					<button
						className="edit-button"
						type="button"
						onClick={() => toggleModal(editHabitModal)}>
						Edit
					</button>
				</div>
				<div className="habit-details__why">
					<p>Why: {habit.habit_why}</p>
					{/* <p>Example habit why</p> */}
				</div>
			</div>
			<button
				className={isToday(habit.last_complete) ? "hidden" : "complete-button"}
				type="button"
				onClick={() => handleCompleteHabit(habit.id)}>
				Complete
			</button>
			<div className="habit-stats">
				<div className="habit-stats__streak">
					<p>Streak: {habit.streak}</p>
				</div>
				<div className="habit-stats__progress">
					<p>{habit.progress}%</p>
				</div>
			</div>
			<dialog
				className="habit-modal"
				ref={editHabitModal}
				onClick={(e) => {
					if (e.currentTarget === e.target) {
						toggleModal(editHabitModal);
					}
				}}>
				<form
					className="modal-form"
					onSubmit={(event) => handleEditHabit(event, habit.id)}>
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
						<button type="button" onClick={() => toggleModal(editHabitModal)}>
							Cancel
						</button>
						<button type="submit">Save</button>
					</div>
				</form>
			</dialog>
		</div>
	);
};

export default Habit;
