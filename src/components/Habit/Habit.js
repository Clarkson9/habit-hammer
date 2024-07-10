import "./Habit.scss";

const Habit = ({ habit, handleDeleteHabit }) => {
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
					<button className="edit-button" type="button"></button>
				</div>
				<div className="habit-details__why">
					<p>Why: {habit.habit_why}</p>
					{/* <p>Example habit why</p> */}
				</div>
			</div>
			<button className="complete-button" type="button">
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
		</div>
	);
};

export default Habit;
