import PropertyEditForm from "@/components/EditProperty/PropertyEditForm";
import type { PropertyType } from "@/components/Properties/properties.types";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { fetchSingleProperty } from "app/lib/data";
import React from "react";

const PropertyEditPage = async ({ params }: { params: { id: string } }) => {
	const propertyDoc = await fetchSingleProperty(params.id);

	const property = convertToSerializeableObject(propertyDoc) as PropertyType;

	if (!property) {
		return (
			<h1 className="text-center text-2xl font-bold mt-10">
				Property Not Found
			</h1>
		);
	}

	return (
		<section className="bg-blue-50">
			<div className="container m-auto max-w-2xl py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<PropertyEditForm property={property} />
				</div>
			</div>
		</section>
	);
};

export default PropertyEditPage;
