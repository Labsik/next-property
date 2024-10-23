import type { PropertyType } from "@/components/Properties/properties.types";
import connectDB from "@/config/database";
import Property from "@/models/Property";

export async function fetchProperties(): Promise<PropertyType[]> {
  await connectDB();
  try {
    const properties = await Property.find({}).lean<PropertyType[]>();

    return properties;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch properties.");
  }
}

export async function fetchLatestProperties(): Promise<PropertyType[]> {
  await connectDB();
  try {
    const properties = await Property.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .lean<PropertyType[]>();

    return properties;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch properties.");
  }
}

export async function fetchSingleProperty(
  id: string
): Promise<PropertyType | null | undefined> {
  await connectDB();

  try {
    const property = await Property.findById(id).lean<PropertyType>();

    return property;
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch properties.");
  }
}
