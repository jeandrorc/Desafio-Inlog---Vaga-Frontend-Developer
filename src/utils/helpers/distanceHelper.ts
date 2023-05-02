type PositionType = {
  lat: number;
  lng: number;
};

export const getUserLocation = (): Promise<PositionType> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
};

export const distanceToHuman = (valor: number | null | undefined): string => {
  if (!valor) {
    return "Não foi possivel obter a distancia."
  }
  if (valor < 0) {
    throw new Error('A distância não pode ser negativa');
  }

  if (valor < 1) {
    // Converte de quilômetros para metros (1 quilômetro = 1000 metros)
    const metros = valor * 1000;
    return `${metros} mts`;
  }

  // Se a distância for 1 quilômetro ou mais, retorna a distância em quilômetros
  return `${valor} Km`;
}

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return parseFloat(distance.toFixed(2));
};


