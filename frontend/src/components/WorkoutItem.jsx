import React, { useContext, useState } from "react";

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

	const { setWorkouts } = useContext(WorkoutsContext);

	const [curWorkout, setCurWorkout] = useState({
		title: title,
		reps: reps,
		load: load,
		sets: sets,
	});
	const [isDeleting, setIsDeleting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [enableEdit, setEnableEdit] = useState(false);

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
				prev.map((workout) => (workout._id === data._id ? data : workout))
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
			<div className="flex items-center justify-between p-2">
				<input
					type="text"
					name="title"
					disabled={!enableEdit}
					onChange={handleEditWorkout}
					value={curWorkout.title}
					className="px-2 bg-white"
				/>
				<ul className="flex gap-2 text-xl text-gray-400">
					{enableEdit && (
						<li>
							<button
								onClick={() => editWorkout(_id)}
								className="duration-200 hover:scale-125"
							>
								<TbCheck />
							</button>
						</li>
					)}
					<li>
						<button
							onClick={() => setEnableEdit((prev) => !prev)}
							className="duration-200 hover:scale-125"
						>
							{enableEdit ? <TbX /> : <TbPencil />}
						</button>
					</li>
					<li>
						<button
							className="duration-200 hover:scale-125"
							disabled={isDeleting}
							onClick={() => deleteWorkout(_id)}
						>
							{isDeleting ? (
								<TbLoader2 className="animate-spin" />
							) : (
								<TbTrashX />
							)}
						</button>
					</li>
				</ul>
			</div>
			<div className="py-1.5 px-4 text-sm bg-gray-100">
				<ul className="flex gap-10">
					<li className="flex items-center gap-1">
						<TbCircleDashed />
						<input
							disabled={!enableEdit}
							type="number"
							name="reps"
							onChange={handleEditWorkout}
							value={curWorkout.reps}
							className="w-10 pl-1 rounded-lg"
						/>
						{!enableEdit && (
							<span className="absolute ml-10 text-xs">reps</span>
						)}
					</li>

					<li className="flex items-center gap-1">
						<TbCircle />
						<input
							disabled={!enableEdit}
							type="number"
							name="sets"
							onChange={handleEditWorkout}
							value={curWorkout.sets}
							className="w-10 pl-1 rounded-lg"
						/>
						{!enableEdit && (
							<span className="absolute ml-10 text-xs">sets</span>
						)}
					</li>

					<li className="flex items-center gap-1">
						<TbWeight />
						<input
							disabled={!enableEdit}
							type="number"
							name="load"
							onChange={handleEditWorkout}
							value={curWorkout.load}
							className="w-10 pl-1 rounded-lg"
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
