import { Button } from "antd";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import getStreetName from "./utilis";

export interface ILocationProps {
  latitude?: number;
  longitude?: number;
}

export interface ILocationTrackerProps {
  formattedAddress?: string;
  setFormattedAddress: Dispatch<SetStateAction<string>>;
}
const LocationTracker: FC<ILocationTrackerProps> = ({
  formattedAddress,
  setFormattedAddress,
}) => {
  const [latLng, setLatLng] = useState<ILocationProps>({});
  const [canLocate, setLocate] = useState(false);

  useEffect(() => {
    if (navigator.geolocation && canLocate) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const payload = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        };
        const address = await getStreetName(payload);
        setFormattedAddress(address);
        setLatLng(payload);
      });
    }
  }, [canLocate]);

  const isLoading = canLocate && !(latLng.latitude || latLng.longitude);
  return (
    <div>
      <Button
        type="primary"
        style={{ marginTop: "4px" }}
        onClick={() => setLocate(true)}
        loading={isLoading}
        disabled={!!formattedAddress}
      >
        Use my location
      </Button>
    </div>
  );
};

export default LocationTracker;
