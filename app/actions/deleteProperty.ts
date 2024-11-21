"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId: string) => {
	await connectDB();

	const session = await getSessionUser();

	if (!session || !session.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = session;

	const property = await Property.findById(propertyId);

	if (!property) throw new Error("Property Not Found");

	if (property.owner.toString() !== userId) throw new Error("Unauthorized");

	// extract public id's from image url in DB
	const publicIds =
		property?.images?.map((imageUrl: string) => {
			const parts = imageUrl?.split("/");
			const lastPart = parts?.at(-1);
			return lastPart?.split(".")?.at(0);
		}) || [];

	if (publicIds.length > 0) {
		// Delete images from Cloudinary
		for (const publicId of publicIds) {
			// biome-ignore lint/style/useTemplate: <explanation>
			await cloudinary.uploader.destroy("propertypulse/" + publicId);
		}
	}

	// Proceed with property deletion
	await property.deleteOne();

	revalidatePath("/", "layout");
};

export default deleteProperty;
