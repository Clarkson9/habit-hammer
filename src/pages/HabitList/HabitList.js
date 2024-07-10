import "./HabitList.scss";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Habit from "../../components/Habit/Habit.js";

const HabitList = () => {
	const [habitList, setHabitList] = useState([]);

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

	const toggleModal = (ref) => {
		ref.current.hasAttribute("open")
			? ref.current.close()
			: ref.current.showModal();
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
			<dialog
				className="add-habit-modal"
				ref={addHabitModal}
				onClick={(e) => {
					if (e.currentTarget === e.target) {
						toggleModal(addHabitModal);
					}
				}}>
				<form className="modal-form">
					<h2>Add a new habit to your list</h2>
					<input
						type="text"
						name="habit_name"
						className="modal-form__input"
						// onChange={handleChangeState}
						// value={formValues.email}
						placeholder="Habit"></input>
					<input
						type="text"
						name="habit_why"
						className="modal-form__input"
						// onChange={handleChangeState}
						// value={formValues.email}
						placeholder="Why"></input>
					<div className="button-wrapper">
						<button type="button" onClick={() => toggleModal(addHabitModal)}>
							Cancel
						</button>
						<button type="submit">+ Add new habit</button>
					</div>
				</form>
			</dialog>
		</main>
	);
};

export default HabitList;
