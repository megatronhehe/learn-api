import React, { useContext } from "react";

import WorkoutItem from "./WorkoutItem";

import { TbRefresh } from "react-icons/tb";

import WorkoutsContext from "../context/WorkoutsContext";

export default function WorkoutList() {
	const { workouts, isLoading, isErrorExist, errorMsg, setRetrig } =
		useContext(WorkoutsContext);

	if (isLoading) {
		return <div className="pt-12 text-center">Loading ...</div>;
	}

	if (isErrorExist) {
		return (
			<div className="flex flex-col items-center gap-6 pt-12">
				<h1>{errorMsg}</h1>
				<button
					onClick={() => setRetrig((prev) => !prev)}
					className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-400 rounded-xl w-22"
				>
					Try again <TbRefresh />
				</button>
			</div>
		);
	}

	const workoutElements = workouts.map((workout) => (
		<WorkoutItem key={workout._id} workout={workout} />
	));

	return <ul className="flex flex-col gap-2">{workoutElements}</ul>;
}
