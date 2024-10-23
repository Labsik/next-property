import React from "react";
import properties from "../../../properties.json";
import PropertyCard from "@/components/Properties/PropertyCard";
import Link from "next/link";
import { fetchLatestProperties } from "app/lib/data";

const HomeProperties = async () => {
	const recentProperties = await fetchLatestProperties();
	return (
		<>
			<section className="px-4 py-6">
				<div className="container-xl lg:container m-auto">
					<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
						Recent Properties
					</h2>
					{properties?.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{recentProperties.map((property) => {
								return <PropertyCard property={property} key={property._id} />;
							})}
						</div>
					) : (
						<p>no properties</p>
					)}
				</div>

				<section className="m-auto max-w-lg my-10 px-6">
					<Link
						href="/properties"
						className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
					>
						View All Properties
					</Link>
				</section>
			</section>
		</>
	);
};

export default HomeProperties;
