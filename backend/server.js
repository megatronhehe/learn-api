require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// middleware (code thatruns between request stuff)
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your React app's origin
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
// listen for request

mongoose
	.connect(`${process.env.MONGO_URI}`)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`connected to db and listening on port ${process.env.PORT} `);
		});
	})
	.catch((err) => {
		console.log(err);
	});
