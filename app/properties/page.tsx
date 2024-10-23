import type { PropertyType } from "@/components/Properties/properties.types";
import PropertyCard from "@/components/Properties/PropertyCard";
import { fetchProperties } from "app/lib/data";

const PropertyPage = async () => {
	const properties: PropertyType[] = await fetchProperties();

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto">
				{properties?.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties.map((property) => {
							return <PropertyCard property={property} key={property._id} />;
						})}
					</div>
				) : (
					<p>no properties</p>
				)}
			</div>
		</section>
	);
};

export default PropertyPage;
