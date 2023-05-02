const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export const loadGoogleMapsScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", () => {
        resolve({});
      });
      document.body.appendChild(script);
    });
  };
  