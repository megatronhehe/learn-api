import React, { useContext } from "react";

import WorkoutItem from "./WorkoutItem";

import { TbRefresh, TbPlus, TbLoader2 } from "react-icons/tb";

import WorkoutsContext from "../context/WorkoutsContext";

export default function WorkoutList({ setToggleModal }) {
	const { workouts, isLoading, isErrorExist, errorMsg, setRetrig } =
		useContext(WorkoutsContext);

	const isListEmpty = workouts.length === 0;

	if (isLoading) {
		return (
			<div className="flex flex-col items-center gap-6 pt-12">
				<h1 className="flex items-center gap-2">
					Loading <TbLoader2 className="text-xl animate-spin" />
				</h1>
			</div>
		);
	}

	if (isErrorExist) {
		return (
			<div className="flex flex-col items-center gap-6 pt-12">
				<h1>{errorMsg}</h1>
				<button
					onClick={() => setRetrig((prev) => !prev)}
					className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-400 rounded-xl w-22"
				>
					Try again <TbRefresh />
				</button>
			</div>
		);
	}

	if (isListEmpty) {
		return (
			<div className="flex flex-col items-center gap-6 pt-12">
				<h1>You dont have any workout listed yet.</h1>
				<button
					onClick={() => setToggleModal(true)}
					className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-green-400 rounded-xl w-22"
				>
					create
					<TbPlus />
				</button>
			</div>
		);
	}

	const workoutElements = workouts.map((workout) => (
		<WorkoutItem key={workout._id} workout={workout} />
	));

	return <ul className="flex flex-col gap-2">{workoutElements}</ul>;
}
