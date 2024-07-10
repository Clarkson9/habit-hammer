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
			.then((response) => {
				// console.log(response.data);
				setHabitList(response.data);
			});
	}, []);
	console.log(habitList);

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
				.then(() => {
					axios
						.get("http://localhost:8080/habit", {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
						.then((response) => {
							setHabitList(response.data);
						});
					toggleModal(addHabitModal);
				})
				.catch((err) => {
					console.log(err);
					// if (err.response.status === 400) setWrongPassword(true);
				});
		}
	};

	const handleDeleteHabit = (id) => {
		axios
			.delete(`http://localhost:8080/habit/${id}`, {
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
						setHabitList(response.data);
					});
			});
	};

	return (
		<main className="center-box">
			<div className="habit-list-wrapper">
				<ul className="habit-list">
					{habitList[0]
						? habitList.map((habit) => {
								return (
									<li className="habit-list-item" key={habit.id}>
										<Habit
											habit={habit}
											handleDeleteHabit={handleDeleteHabit}
										/>
									</li>
								);
						  })
						: "Loading..."}
					{/* {activeVideo.comments.map((comment) => (
						<li className="comment__container" key={comment.id}>
							<Comment
								handleDeleteComment={handleDeleteComment}
								handleLikeComment={handleLikeComment}
								comment={comment}
								formatDate={formatDate}
							/>
						</li>
					))} */}
				</ul>
				<button
					type="button"
					className="add-habit-button button"
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
			</div>
		</main>
	);
};

export default HabitList;
