import React, { useContext, useState } from "react";

import {
	TbAnalyze,
	TbWeight,
	TbTrashX,
	TbPencil,
	TbLoader2,
} from "react-icons/tb";

import WorkoutsContext from "../context/WorkoutsContext";

export default function WorkoutItem({ workout }) {
	const { _id, load, reps, title } = workout;

	const { setWorkouts } = useContext(WorkoutsContext);

	const [isDeleting, setIsDeleting] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const deleteWorkout = async (id) => {
		setIsDeleting(true);
		setErrorMsg("");
		try {
			const res = await fetch(`http://localhost:4000/api/workouts/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) {
				return setErrorMsg(`${res.status} | ${res.statusText}`);
			}

			const data = await res.json();
			setWorkouts((prev) => prev.filter((workout) => workout._id !== data._id));
		} catch (error) {
			setErrorMsg(error.message);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<li className="flex items-center px-4 py-2 border rounded-xl">
			<h2 className="w-2/5">{title}</h2>

			<ul className="flex w-2/5 gap-4">
				<li className="flex items-center gap-1">
					<TbWeight />
					<p>
						{load} <span className="text-xs">kg</span>
					</p>
				</li>
				<li className="flex items-center gap-1">
					<TbAnalyze />
					<p>
						{reps} <span className="text-xs">reps</span>
					</p>
				</li>
			</ul>

			<ul className="flex justify-end w-1/5 gap-1 text-xl text-gray-400">
				<li>
					<TbPencil />
				</li>
				<li>
					<button disabled={isDeleting} onClick={() => deleteWorkout(_id)}>
						{isDeleting ? <TbLoader2 className="animate-spin" /> : <TbTrashX />}
					</button>
				</li>
			</ul>
		</li>
	);
}
