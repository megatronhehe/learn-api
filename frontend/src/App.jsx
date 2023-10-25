import React, { useState } from "react";

import { HiPlusSmall } from "react-icons/hi2";
import WorkoutList from "./components/WorkoutList";
import DateList from "./components/DateList";
import CreateWorkoutModal from "./components/CreateWorkoutModal";

function App() {
	const [toggleModal, setToggleModal] = useState(false);

	return (
		<>
			<main className="flex justify-center p-4 font-extralight">
				<div className="w-full max-w-2xl">
					<section className="mb-4">
						<DateList />
					</section>

					<section className="flex items-center justify-between pb-4 pr-2 mb-4 text-xl border-b">
						<h1 className="tracking-wide">My Workout</h1>
						<HiPlusSmall
							onClick={() => setToggleModal(true)}
							className="text-gray-500"
						/>
					</section>

					<section>
						<WorkoutList />
					</section>
				</div>
			</main>

			{toggleModal && <CreateWorkoutModal setToggleModal={setToggleModal} />}
		</>
	);
}

export default App;
