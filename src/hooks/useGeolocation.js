// hooks/useGeolocation.js
import { useGeolocated } from "react-geolocated";

const useGeolocation = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: false },
      userDecisionTimeout: 5000,
    });

  return { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition };
};

export default useGeolocation;
