import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const checkBookmarkStatus = async (propertyId: string) => {
	await connectDB();

	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		return { error: "User ID is required" };
	}

	const { userId } = sessionUser;

	// Find user in database
	const user = await User?.findById(userId);

	// Check if property is bookmarked
	const isBookmarked = user?.bookmarks?.includes(propertyId);

	return { isBookmarked };
};

export default checkBookmarkStatus;
