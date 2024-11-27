"use client";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import type { PropertyType } from "@/components/Properties/properties.types";

import { toast } from "react-toastify";
import bookmarkProperty from "app/actions/bookmarkProperty";

type Props = {
	property: PropertyType;
};

const BookmarkButton = ({ property }: Props) => {
	const { data: session } = useSession();

	console.log("session", session);

	const user = session?.user;

	const [isBookmarked, setIsBookmarked] = useState(false);

	const handleClick = async () => {
		if (!user) {
			toast.error("You need to sign in to bookmark a property");
			return;
		}

		bookmarkProperty(property._id).then((res) => {
			// if (res.error) return toast.error(res.error);
			console.log("res", res);
			setIsBookmarked(res.isBookmarked);
			toast.success(res.message);
		});
	};

	return isBookmarked ? (
		<button
			type="button"
			onClick={handleClick}
			className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
		>
			<FaBookmark className="mr-2" /> Remove Bookmark
		</button>
	) : (
		<button
			type="button"
			onClick={handleClick}
			className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
		>
			<FaBookmark className="mr-2" /> Bookmark Property
		</button>
	);
};
export default BookmarkButton;
