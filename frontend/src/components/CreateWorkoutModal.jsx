import React, { useContext, useState } from "react";

import {
	TbCircle,
	TbWeight,
	TbX,
	TbLoader2,
	TbCircleDashed,
} from "react-icons/tb";

import WorkoutsContext from "../context/WorkoutsContext";

export default function CreateWorkoutModal({ setToggleModal }) {
	const [workoutForm, setWorkoutForm] = useState({
		title: "",
		load: 0,
		reps: 0,
		sets: 0,
	});
	const [isAdding, setIsAdding] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const { setWorkouts } = useContext(WorkoutsContext);

	const handleWorkoutForm = (e) => {
		const { name, value } = e.target;
		setWorkoutForm((prev) => ({ ...prev, [name]: value }));
	};

	const createWorkout = async (e) => {
		e.preventDefault();
		setIsAdding(true);
		setErrorMsg("");
		try {
			const res = await fetch("http://localhost:4000/api/workouts/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(workoutForm),
			});

			if (!res.ok) {
				return setErrorMsg(`${res.status} | ${res.statusText}`);
			}
			const data = await res.json();
			setWorkouts((prev) => [data, ...prev]);
			setToggleModal(false);
		} catch (error) {
			setErrorMsg(error.message);
		} finally {
			setIsAdding(false);
		}
	};

	const isValid = workoutForm.title.length > 0 && workoutForm.reps > 0;

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
						<div className="flex flex-col items-center w-1/3 gap-2">
							<label htmlFor="load" className="flex items-center gap-1">
								<TbWeight />
								Load<span className="text-xs">(Kg)</span>
							</label>
							<input
								id="load"
								name="load"
								type="number"
								onChange={handleWorkoutForm}
								value={workoutForm.load}
								className="w-full px-4 py-2 border rounded-xl"
							/>
						</div>

						<div className="flex flex-col items-center w-1/3 gap-2">
							<label htmlFor="reps" className="flex items-center gap-1">
								<TbCircleDashed /> Reps
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

						<div className="flex flex-col items-center w-1/3 gap-2">
							<label htmlFor="sets" className="flex items-center gap-1">
								<TbCircle /> Sets
							</label>
							<input
								id="sets"
								name="sets"
								type="number"
								onChange={handleWorkoutForm}
								value={workoutForm.sets}
								className="w-full px-4 py-2 border rounded-xl"
							/>
						</div>
					</div>

					<button
						disabled={isAdding || !isValid}
						onClick={createWorkout}
						className={`px-4 py-2 text-white bg-green-400 rounded-xl
							${!isValid ? "bg-gray-300" : "bg-green-400 "}
						`}
					>
						{isAdding ? (
							<TbLoader2 className="animate-spin" />
						) : (
							"create new workout +"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
