import React from "react";

import { HiPlusSmall } from "react-icons/hi2";
import WorkoutList from "./components/WorkoutList";

function App() {
	return (
		<main className="flex justify-center p-4 font-extralight">
			<div className="w-full max-w-2xl">
				<section className="flex items-center justify-between pb-4 mb-4 text-xl border-b">
					<h1>My Workout</h1>
					<HiPlusSmall />
				</section>

				<section>
					<WorkoutList />
				</section>
			</div>
		</main>
	);
}

export default App;
