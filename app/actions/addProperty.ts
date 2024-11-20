"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface AddPropertyData {
	type: FormDataEntryValue | null;
	name: FormDataEntryValue | null;
	description: FormDataEntryValue | null;
	location: {
		street: FormDataEntryValue | null;
		city: FormDataEntryValue | null;
		state: FormDataEntryValue | null;
		zipcode: FormDataEntryValue | null;
	};
	beds: FormDataEntryValue | null;
	baths: FormDataEntryValue | null;
	square_feet: FormDataEntryValue | null;
	amenities: FormDataEntryValue[];
	rates: {
		weekly?: FormDataEntryValue | null;
		monthly?: FormDataEntryValue | null;
		nightly?: FormDataEntryValue | null;
	};
	seller_info: {
		name: FormDataEntryValue | null;
		email: FormDataEntryValue | null;
		phone: FormDataEntryValue | null;
	};
	images?: string[]; // Add images as an optional string array
	owner: string;
}

async function addProperty(formData: FormData) {
	await connectDB();

	const session = await getSessionUser();

	if (!session || !session.userId) {
		throw new Error("User ID is required");
	}

	const { userId } = session;

	const amenities = formData.getAll("amenities");
	const images = formData
		.getAll("images")
		.filter((image) => typeof image === "object" && image !== null);

	const propertyData: AddPropertyData = {
		type: formData.get("type"),
		name: formData.get("name"),
		description: formData.get("description"),
		location: {
			street: formData.get("location.street"),
			city: formData.get("location.city"),
			state: formData.get("location.state"),
			zipcode: formData.get("location.zipcode"),
		},
		beds: formData.get("beds"),
		baths: formData.get("baths"),
		square_feet: formData.get("square_feet"),
		amenities,
		rates: {
			weekly: formData.get("rates.weekly"),
			monthly: formData.get("rates.monthly"),
			nightly: formData.get("rates.nightly."),
		},
		seller_info: {
			name: formData.get("seller_info.name"),
			email: formData.get("seller_info.email"),
			phone: formData.get("seller_info.phone"),
		},
		images: [],
		owner: userId,
	};
	const imageUrls = [];

	for (const imageFile of images) {
		const imageBuffer = await (imageFile as Blob).arrayBuffer();
		const imageArray = Array.from(new Uint8Array(imageBuffer));
		const imageData = Buffer.from(imageArray);

		// Convert the image data to base64
		const imageBase64 = imageData.toString("base64");

		// Make request to upload to Cloudinary
		const result = await cloudinary.uploader.upload(
			`data:image/png;base64,${imageBase64}`,
			{
				folder: "propertypulse",
			},
		);

		imageUrls.push(result.secure_url);
	}

	propertyData.images = imageUrls;

	const newProperty = new Property(propertyData);
	await newProperty.save();

	revalidatePath("/", "layout");

	redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
