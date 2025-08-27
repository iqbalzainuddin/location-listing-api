const ApiError = require("@/utils/classes/ApiError");
const { successResponse, errorResponse } = require("@/utils/functions/apiResponse");
const listingService = require("@/features/listings/listings.service");

const createListing = async (req, res, next) => {
  const { body, user } = req;
  const listingData = {
    user_id: user.id,
    ...body
  };
  
  try {
    const result = await listingService.createListing(listingData);
    return successResponse(res, "success", 200, result);
  } catch (error) {
    next(error);
  }
}

const getAllListings = async (req, res, next) => {
  const { latitude, longitude } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const data = await listingService.findAllListing({
      clientLatitude: latitude,
      clientLongitude: longitude,
      offset,
      limit
    });

    const results = {
      page,
      total_pages: Math.ceil(data.count / limit),
      from: offset + 1,
      to: offset + data.rows.length,
      data: data.rows
    };

    return successResponse(res, "success", 200, results);
  } catch (error) {
    next(error);
  }
}

const getListingById = async (req, res, next) => {
  const { id } = req.params;
  const { latitude, longitude } = req.query;

  try {
    const result = await listingService.findListingById(id, latitude, longitude);

    if (!result) {
      throw new ApiError(404, "Listing not found");
    }

    return successResponse(res, "success", 200, result);
  } catch (error) {
    next(error);
  }
}

const updateListingById = async (req, res, next) => {
  const { id } = req.params;
  const { body: listingData } = req;

  try {
    const listing = await listingService.findListingById(id);

    if (!listing) {
      return errorResponse(res, "Listing does not exist", 401);
    }

    const result = await listing.update(listingData);

    return successResponse(res, "success", 200, result);
  } catch (error) {
    next(error);
  }
}

const deleteListingById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const listing = await listingService.findListingById(id);

    if (!listing) {
      return errorResponse(res, "Listing does not exist", 401);
    }

    const result = await listing.destroy();

    return successResponse(res, "success", 200, result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createListing,
  getAllListings,
  getListingById,
  updateListingById,
  deleteListingById
}
