import React, { useContext, useState } from "react";

import {
	TbWeight,
	TbTrashX,
	TbPencil,
	TbLoader2,
	TbCircle,
	TbCircleDashed,
} from "react-icons/tb";

import WorkoutsContext from "../context/WorkoutsContext";

export default function WorkoutItem({ workout }) {
	const { _id, load, reps, sets, title } = workout;

	const { setWorkouts } = useContext(WorkoutsContext);

	const [isDeleting, setIsDeleting] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	console.log(workout);

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
		<li className="flex flex-col overflow-hidden border rounded-xl">
			<div className="flex items-center justify-between p-2">
				<h2>{title}</h2>
				<ul className="flex gap-2 text-xl text-gray-400">
					<li>
						<button>
							<TbPencil />
						</button>
					</li>
					<li>
						<button disabled={isDeleting} onClick={() => deleteWorkout(_id)}>
							{isDeleting ? (
								<TbLoader2 className="animate-spin" />
							) : (
								<TbTrashX />
							)}
						</button>
					</li>
				</ul>
			</div>
			<div className="py-1.5 px-2 text-sm bg-gray-100">
				<ul className="flex gap-6">
					<li className="flex items-center gap-1">
						<TbCircleDashed />
						{reps}
						<span className="text-xs">reps</span>
					</li>
					<li className="flex items-center gap-1">
						<TbCircle />
						{sets}
						<span className="text-xs">sets</span>
					</li>
					<li className="flex items-center gap-1">
						<TbWeight />
						{load}
						<span className="text-xs">(Kg)</span>
					</li>
				</ul>
			</div>
		</li>
	);
}
