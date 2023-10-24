import React, { useEffect, useState } from "react";

import { HiPlusSmall } from "react-icons/hi2";
import WorkoutList from "./components/WorkoutList";

function App() {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/api/workouts/")
			.then((res) => res.json())
			.then((data) => setWorkouts(data));
	}, []);

	const workoutElements = workouts.map((workout) => (
		<WorkoutList key={workout._id} workout={workout} />
	));

	return (
		<main className="flex justify-center font-extralight px-4">
			<div className="max-w-2xl w-full py-28">
				<section className="text-xl border-b pb-4 mb-4 flex justify-between items-center">
					<h1>My Workout</h1>
					<HiPlusSmall />
				</section>

				<section>
					<ul>{workoutElements}</ul>
				</section>
			</div>
		</main>
	);
}

export default App;
