import React, { useState, useEffect } from "react";

import WorkoutsContext from "./WorkoutsContext";

export default function WorkoutsContextProvider({ children }) {
	const [isLoading, setIsLoading] = useState({
		fetching: false,
		creating: false,
	});
	const [errorMsg, setErrorMsg] = useState("");
	const [workouts, setWorkouts] = useState([]);
	const [retrig, setRetrig] = useState(false);

	const fetchWorkout = async () => {
		setIsLoading((prev) => ({ ...prev, fetching: true }));
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
			setIsLoading((prev) => ({ ...prev, fetching: false }));
		}
	};

	useEffect(() => {
		fetchWorkout();
	}, [retrig]);

	const createWorkout = async (workoutForm, setToggleModal) => {
		setIsLoading((prev) => ({ ...prev, creating: true }));
		setErrorMsg("");
		try {
			const res = await fetch("http://localhost:4000/api/workouts/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(workoutForm),
			});

			if (!res.ok) {
				return setErrorMsg(`${res.status} | ${res.statusText}`);
			}
			const data = await res.json();
			setWorkouts((prev) => [data, ...prev]);
			setToggleModal(false);
		} catch (error) {
			setErrorMsg(error.message);
		} finally {
			setIsLoading((prev) => ({ ...prev, creating: false }));
		}
	};

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
				createWorkout,
			}}
		>
			{children}
		</WorkoutsContext.Provider>
	);
}
