import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<h2 className="text-xl font-semibold">404 Not Found</h2>
			<p>Could not find the requested property.</p>
			<Link
				href="/properties"
				className="text-blue-500 hover:text-blue-600 flex items-center"
			>
				<FaArrowLeft className="mr-2" /> Back to Properties
			</Link>
		</main>
	);
}
