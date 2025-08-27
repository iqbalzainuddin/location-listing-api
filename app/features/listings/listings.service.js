const { Listing, User, sequelize } = require("@/models");
const generateCacheKey = require("@/utils/functions/generateCacheKey");
const client = require("@/utils/functions/redisClient");

const createListing = async (listingData) => {
  return await Listing.create(listingData);
}

const findAllListing = async ({
  where = {}, 
  includeUser = false,
  offset = 0,
  limit = 10,
  clientLatitude, 
  clientLongitude
}) => {
  const cacheKey = generateCacheKey("listings", {
    where,
    includeUser,
    offset,
    limit,
    clientLatitude,
    clientLongitude
  });
  const cachedValue = await client.get(cacheKey);

  if (cachedValue) {
    return JSON.parse(cachedValue);
  }
  
  const results = await Listing.findAndCountAll({
    where,
    attributes: {
      exclude: ["user_id", "latitude", "longitude"],
      include: [
        [
          sequelize.literal(`
            ROUND(
              (6371 * acos(
                cos(radians(${clientLatitude}))
                * cos(radians(Listing.latitude))
                * cos(radians(Listing.longitude) - radians(${clientLongitude}))
                + sin(radians(${clientLatitude}))
                * sin(radians(Listing.latitude))
            )), 2)
          `),
          "distance"
        ]
      ],
    },
    include: includeUser 
      ? {
        model: User,
        as: "author",
        attributes: ["name"]
      } 
      : [],
    offset,
    limit
  });
  await client.setEx(cacheKey, 60, JSON.stringify(results));

  return results;
}

const findListingById = async (id, clientLatitude, clientLongitude) => {
  return await Listing.findByPk(id, {
    attributes: {
      exclude: ["user_id", "latitude", "longitude"],
      include: clientLatitude && clientLongitude 
        ? [
            [
              sequelize.literal(`
                ROUND(
                  (6371 * acos(
                    cos(radians(${clientLatitude}))
                    * cos(radians(Listing.latitude))
                    * cos(radians(Listing.longitude) - radians(${clientLongitude}))
                    + sin(radians(${clientLatitude}))
                    * sin(radians(Listing.latitude))
                )), 2)
              `),
              "distance"
            ]
        ]
        : [],
    }, 
  });
}

module.exports = {
  createListing,
  findAllListing,
  findListingById
};
