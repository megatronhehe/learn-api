import React, { useState, useEffect } from "react";

import WorkoutsContext from "./WorkoutsContext";

export default function WorkoutsContextProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
	const [workouts, setWorkouts] = useState([]);

	const [retrig, setRetrig] = useState(false);

	const fetchWorkout = async () => {
		setIsLoading(true);
		setErrorMsg("");
		try {
			const res = await fetch("http://localhost:4000/api/workouts/");

			if (!res.ok) {
				return setErrorMsg(`${res.status} | ${res.statusText}`);
			}

			const data = await res.json();
			setWorkouts(data);
		} catch (error) {
			setErrorMsg(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchWorkout();
	}, [retrig]);

	const isErrorExist = errorMsg.length > 0;

	return (
		<WorkoutsContext.Provider
			value={{
				workouts,
				setWorkouts,
				isLoading,
				isErrorExist,
				errorMsg,
				setRetrig,
			}}
		>
			{children}
		</WorkoutsContext.Provider>
	);
}
