import React, { useState } from "react";

import { TbAnalyze, TbWeight, TbX } from "react-icons/tb";

export default function CreateWorkoutModal({ setToggleModal }) {
	const [workoutForm, setWorkoutForm] = useState({
		title: "",
		loads: 0,
		reps: 0,
	});

	const handleWorkoutForm = (e) => {
		const { name, value } = e.target;
		setWorkoutForm((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div
			onClick={() => setToggleModal(false)}
			className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full backdrop-filter backdrop-blur-sm "
		>
			<button className="flex items-center justify-center w-8 h-8 mb-4 text-white duration-200 bg-red-300 rounded-full hover:bg-red-400 hover:scale-110">
				<TbX />
			</button>
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-xs p-4 bg-white border rounded-xl"
			>
				<form className="flex flex-col gap-4 font-extralight">
					<div className="flex flex-col items-center gap-2">
						<label htmlFor="title">Title</label>
						<input
							id="title"
							name="title"
							type="text"
							onChange={handleWorkoutForm}
							value={workoutForm.title}
							placeholder="e.g; Push up, Pull up"
							className="w-full px-4 py-2 border rounded-xl"
						/>
					</div>

					<div className="flex gap-4">
						<div className="flex flex-col items-center w-1/2 gap-2">
							<label htmlFor="loads" className="flex items-center gap-2">
								<TbWeight /> Loads <span className="text-sm">(Kg)</span>
							</label>
							<input
								id="loads"
								name="loads"
								type="number"
								onChange={handleWorkoutForm}
								value={workoutForm.loads}
								className="w-full px-4 py-2 border rounded-xl"
							/>
						</div>

						<div className="flex flex-col items-center w-1/2 gap-2">
							<label htmlFor="reps" className="flex items-center gap-2">
								<TbAnalyze /> Reps
							</label>
							<input
								id="reps"
								name="reps"
								type="number"
								onChange={handleWorkoutForm}
								value={workoutForm.reps}
								className="w-full px-4 py-2 border rounded-xl"
							/>
						</div>
					</div>

					<button className="px-4 py-2 text-white bg-green-400 rounded-xl">
						create new workout +
					</button>
				</form>
			</div>
		</div>
	);
}
