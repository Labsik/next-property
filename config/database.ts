import mongoose from "mongoose";

const connected = false;

const connectDB = async () => {
	mongoose.set("strictQuery", true);
	if (connected) {
		console.log("Connected to database");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
	} catch (error) {
		console.log("error", error);
	}
};

export default connectDB;
