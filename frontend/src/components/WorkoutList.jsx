import React from "react";

import { TbAnalyze, TbWeight, TbTrashX, TbPencil } from "react-icons/tb";

export default function WorkoutList({ workout }) {
	const { load, reps, title } = workout;

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

			<ul className="flex justify-end w-1/5 gap-1 text-gray-400">
				<li>
					<TbPencil className="text-xl" />
				</li>
				<li>
					<TbTrashX className="text-xl" />
				</li>
			</ul>
		</li>
	);
}
