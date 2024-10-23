import PropertyDetails from "@/components/PropertyItem/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyItem/PropertyHeaderImage";

import { fetchSingleProperty } from "app/lib/data";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { notFound } from "next/navigation";

const PropertyPage = async ({ params }: { params: { id: string } }) => {
	const property = await fetchSingleProperty(params.id);

	if (!property) {
		notFound();
	}

	return (
		<>
			<PropertyHeaderImage image={property?.images[0]} />
			<section>
				<div className="container m-auto py-6 px-6">
					<Link
						href="/properties"
						className="text-blue-500 hover:text-blue-600 flex items-center"
					>
						<FaArrowLeft className="mr-2" /> Back to Properties
					</Link>
				</div>
			</section>
			<section className="bg-blue-50">
				<div className="container m-auto py-10 px-6">
					<div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
						<PropertyDetails property={property} />

						{/* <!-- Sidebar --> */}
						{/* <aside className="space-y-4">
								<BookmarkButton property={property} />
								<ShareButtons property={property} />
								<PropertyContactForm property={property} />
							</aside> */}
					</div>
				</div>
			</section>
		</>
		// )
	);
};

export default PropertyPage;
