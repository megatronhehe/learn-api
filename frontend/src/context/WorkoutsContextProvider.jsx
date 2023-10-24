import React, { useState, useEffect } from "react";

import WorkoutsContext from "./WorkoutsContext";

export default function WorkoutsContextProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
	const [workouts, setWorkouts] = useState([]);

	const [retrig, setRetrig] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setErrorMsg("");
		fetch("http://localhost:4000/api/workouts/")
			.then((res) => {
				if (!res.ok) {
					return setErrorMsg("Something Went Wrong");
				}
				return res.json();
			})
			.then((data) => setWorkouts(data))
			.catch((err) => setErrorMsg(err))
			.finally(() => setIsLoading(false));
	}, [retrig]);

	const isErrorExist = errorMsg.length > 0;

	return (
		<WorkoutsContext.Provider
			value={{ workouts, isLoading, isErrorExist, errorMsg, setRetrig }}
		>
			{children}
		</WorkoutsContext.Provider>
	);
}
