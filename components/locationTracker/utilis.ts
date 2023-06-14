import { ILocationProps } from "./index";
import axios from "axios";

const getStreetName = async ({ latitude, longitude }: ILocationProps) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`
    );

    if (response.data.status === "OK") {
      const result = response.data.results[0];
      // Extract the street name from the address_components
      const formatted_address = result.formatted_address;

      return formatted_address;
    } else {
      throw new Error("Unable to retrieve street name.");
    }
  } catch (error) {
    console.error("Error retrieving street name:", error);
    throw error;
  }
};

export default getStreetName;
