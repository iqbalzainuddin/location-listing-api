const generateRandomCoordinate = (min, max, decimals = 6) => {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
};

const generateLocations = (count = 100) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => ({
    name: `Location ${i + 1}`,
    latitude: generateRandomCoordinate(-90, 90),
    longitude: generateRandomCoordinate(-180, 180),
    created_at: now,
    updated_at: now,
  }));
};

module.exports = {
  generateLocations,
};