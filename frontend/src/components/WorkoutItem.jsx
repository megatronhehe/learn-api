import React, { useContext, useEffect, useState } from "react";

import {
	TbWeight,
	TbTrashX,
	TbPencil,
	TbLoader2,
	TbCircle,
	TbCircleDashed,
	TbCheck,
	TbX,
} from "react-icons/tb";

import WorkoutsContext from "../context/WorkoutsContext";

export default function WorkoutItem({ workout }) {
	const { _id, load, reps, sets, title } = workout;

	const { deleteWorkout, isLoading } = useContext(WorkoutsContext);

	const [curWorkout, setCurWorkout] = useState({
		title: title,
		reps: reps,
		load: load,
		sets: sets,
	});

	const [isEditing, setIsEditing] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [enableEdit, setEnableEdit] = useState(false);

	useEffect(() => {
		if (!enableEdit) {
			setCurWorkout({
				...workout,
				title: title,
				reps: reps,
				load: load,
				sets: sets,
			});
		}
	}, [enableEdit]);

	const editWorkout = async (id) => {
		setIsEditing(true);
		setErrorMsg("");
		try {
			const res = await fetch(`http://localhost:4000/api/workouts/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(curWorkout),
			});

			if (!res.ok) {
				return setErrorMsg(`${res.status} | ${res.statusText}`);
			}

			const data = await res.json();
			setWorkouts((prev) =>
				prev.map((workout) => (workout._id === data._id ? curWorkout : workout))
			);
			setEnableEdit(false);
		} catch (error) {
			setErrorMsg(error.message);
		} finally {
			setIsEditing(false);
		}
	};

	const handleEditWorkout = (e) => {
		const { name, value } = e.target;
		setCurWorkout((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<li className="flex flex-col overflow-hidden border rounded-xl">
			<div className="flex items-center justify-between p-2 pr-4">
				<input
					type="text"
					name="title"
					disabled={!enableEdit}
					onChange={handleEditWorkout}
					value={curWorkout.title}
					className="px-2 bg-white"
				/>
				<ul className="flex gap-2 text-xl text-gray-400">
					<li>
						<button
							disabled={!enableEdit}
							onClick={() => editWorkout(_id)}
							className={`duration-200 hover:text-green-400
								${enableEdit ? "scale-100 hover:scale-125 " : "scale-0"}
								`}
						>
							<TbCheck />
						</button>
					</li>

					<li>
						<button
							onClick={() => setEnableEdit((prev) => !prev)}
							className="duration-200 hover:scale-125 hover:text-blue-400"
						>
							{enableEdit ? <TbX /> : <TbPencil />}
						</button>
					</li>

					<li>
						<button
							className="duration-200 hover:scale-125 hover:text-red-400"
							disabled={isLoading.deleting}
							onClick={() => deleteWorkout(_id)}
						>
							{isLoading.deleting ? (
								<TbLoader2 className="animate-spin" />
							) : (
								<TbTrashX />
							)}
						</button>
					</li>
				</ul>
			</div>
			<div className="py-1.5 px-4 text-sm bg-gray-100">
				<ul className="flex gap-8 text-gray-600">
					<li className="flex items-center ">
						<TbCircleDashed />
						<input
							disabled={!enableEdit}
							type="number"
							name="reps"
							onChange={handleEditWorkout}
							value={curWorkout.reps}
							className="w-10 pl-2 duration-200 rounded-lg"
						/>
						{!enableEdit && (
							<span className="absolute ml-10 text-xs">reps</span>
						)}
					</li>

					<li className="flex items-center ">
						<TbCircle />
						<input
							disabled={!enableEdit}
							type="number"
							name="sets"
							onChange={handleEditWorkout}
							value={curWorkout.sets}
							className="w-10 pl-2 duration-200 rounded-lg"
						/>
						{!enableEdit && (
							<span className="absolute ml-10 text-xs">sets</span>
						)}
					</li>

					<li className="flex items-center ">
						<TbWeight />
						<input
							disabled={!enableEdit}
							type="number"
							name="load"
							onChange={handleEditWorkout}
							value={curWorkout.load}
							className="w-10 pl-2 duration-200 rounded-lg"
						/>
						{!enableEdit && (
							<span className="absolute ml-10 text-xs">(Kg)</span>
						)}
					</li>
				</ul>
			</div>
		</li>
	);
}
