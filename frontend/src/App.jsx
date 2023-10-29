import React, { useContext, useState } from "react";

import { HiPlusSmall } from "react-icons/hi2";
import { TbBarbell, TbRefresh } from "react-icons/tb";

import WorkoutList from "./components/WorkoutList";
import CreateWorkoutModal from "./components/CreateWorkoutModal";

import WorkoutsContext from "./context/WorkoutsContext";

function App() {
	const [toggleModal, setToggleModal] = useState(false);

	const { setRefetch } = useContext(WorkoutsContext);

	return (
		<>
			<main className="flex justify-center p-4 font-extralight">
				<div className="w-full max-w-2xl">
					<section className="flex items-center justify-between pb-4 pr-2 mb-4 text-xl border-b">
						<h1 className="flex items-center gap-2 tracking-wide">
							<TbBarbell className="text-3xl" />
							My Workout
						</h1>
						<div className="flex gap-2">
							<button
								onClick={() => setRefetch((prev) => !prev)}
								className="duration-200 hover:scale-125"
							>
								<TbRefresh className="text-gray-500 hover:text-blue-400" />
							</button>
							<button
								onClick={() => setToggleModal(true)}
								className="duration-200 hover:scale-125"
							>
								<HiPlusSmall className="text-gray-500 hover:text-blue-400" />
							</button>
						</div>
					</section>

					<section>
						<WorkoutList setToggleModal={setToggleModal} />
					</section>
				</div>
			</main>

			{toggleModal && <CreateWorkoutModal setToggleModal={setToggleModal} />}
		</>
	);
}

export default App;
