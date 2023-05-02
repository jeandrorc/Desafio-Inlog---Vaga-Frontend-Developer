// hooks/useGoogleMapsScript.ts
import { useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const useGoogleMapsScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "_googleMapScript",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"]
  });

  useEffect(() => {
    if (isLoaded) {
      setIsScriptLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (loadError) {
      console.error("Error loading Google Maps script:", loadError);
    }
  }, [loadError]);

  return { isScriptLoaded, loadError };
};

export default useGoogleMapsScript;
