import React from "react";

export default function DateList() {
	return (
		<ul className="grid grid-cols-7 gap-1 text-sm">
			<li className="flex flex-col items-center justify-between h-20 py-2 border rounded-lg w-1/7">
				<h3>Sun</h3>
				<span>4</span>
			</li>
			<li className="flex flex-col items-center justify-between h-20 py-2 border rounded-lg w-1/7">
				<h3>Mon</h3>
				<span>5</span>
			</li>
			<li className="flex flex-col items-center justify-between h-20 py-2 border rounded-lg w-1/7">
				<h3>Tue</h3>
				<span>6</span>
			</li>
			<li className="flex flex-col items-center justify-between h-20 py-2 border rounded-lg w-1/7">
				<h3>Wed</h3>
				<span>7</span>
			</li>
			<li className="flex flex-col items-center justify-between h-20 py-2 border rounded-lg w-1/7">
				<h3>Thu</h3>
				<span>8</span>
			</li>
			<li className="flex flex-col items-center justify-between h-20 py-2 border rounded-lg w-1/7">
				<h3>Fri</h3>
				<span>9</span>
			</li>
			<li className="flex flex-col items-center justify-between h-20 py-2 border rounded-lg w-1/7">
				<h3>Sat</h3>
				<span>10</span>
			</li>
		</ul>
	);
}
