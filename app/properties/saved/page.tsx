import type { PropertyType } from "@/components/Properties/properties.types";
import PropertyCard from "@/components/Properties/PropertyCard";
import connectDB from "@/config/database";
import User, { type UserType } from "@/models/User";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
	await connectDB();

	const sessionUser = await getSessionUser();

	const userId = sessionUser?.userId;

	const dataDocs: UserType | null = await User.findById(userId)
		.populate("bookmarks")
		.lean<UserType | null>();

	console.log("dffasadsda", dataDocs);

	const data = dataDocs && (convertToSerializeableObject(dataDocs) as UserType);

	const bookmarks = data?.bookmarks;

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				<h1 className="text-2xl mb-4">Saved Properties</h1>

				{bookmarks?.length === 0 ? (
					<p>No saved properties</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{bookmarks?.map((property: PropertyType) => (
							<PropertyCard key={property._id} property={property} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default SavedPropertiesPage;
