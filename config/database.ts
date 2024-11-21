import mongoose from "mongoose";

const connected = false;

const connectDB = async () => {
	mongoose.set("strictQuery", true);
	if (connected) {
		console.log("Connected to database");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI as string, {
			retryWrites: true, // Enable retryWrites (MongoDB will retry write operations if network errors occur)
			connectTimeoutMS: 100000, // Timeout after 10 seconds
			socketTimeoutMS: 450000, // Timeout after 45 seconds of inactivity
		});
	} catch (error) {
		console.log("error", error);
	}
};

export default connectDB;
