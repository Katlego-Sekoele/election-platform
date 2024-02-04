const express = require("express");
const app = express();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		console.info("Connected to MongoDB");
		app.listen(PORT, () => {
			console.info(`Running on http://127.0.0.1:${PORT}`);
		});
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
	}
};

app.use(express.json());
app.use("/", indexRoutes);

connect();

module.exports = app;
