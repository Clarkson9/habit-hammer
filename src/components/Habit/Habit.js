import "./Habit.scss";

const Habit = () => {
	return (
		<li className="habit">
			<button className="delete-button" type="button">
				Delete
			</button>
			<div className="habit-details">
				<div className="habit-details__name">
					<p>Habit:</p>
					<p>Example habit name</p>
					<button className="edit-button" type="button"></button>
				</div>
				<div className="habit-details__why">
					<p>Why:</p>
					<p>Example habit why</p>
				</div>
			</div>
			<button className="complete-button" type="button">
				Complete
			</button>
			<div className="habit-stats">
				<div className="habit-stats__streak">
					<p>Streak: number</p>
				</div>
				<div className="habit-stats__progress">
					<p>#%</p>
				</div>
			</div>
		</li>
	);
};

export default Habit;
