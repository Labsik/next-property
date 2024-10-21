import PropertyCard from "@/components/Properties/PropertyCard";
import properties from "../../properties.json";

const Property = () => {
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

export default Property;
