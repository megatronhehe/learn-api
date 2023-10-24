import React from "react";

import { TbAnalyze, TbWeight } from "react-icons/tb";

export default function WorkoutList({ workout }) {
	const { load, reps, title } = workout;

	return (
		<li className="px-4 py-2 border rounded-xl flex flex-col">
			<h2 className="w-2/3">{title}</h2>
			<ul className="flex gap-4">
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
		</li>
	);
}
