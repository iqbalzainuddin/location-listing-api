const express = require("express");

const listingController = require("@/features/listings/listings.controller");
const { listingParamsSchema, createListingSchema, updateListingSchema, listingQuerySchema } = require("@/features/listings/listing.validation");
const checkAdminRole = require("@/middleware/checkAdminRole");
const validateRequest = require("@/middleware/validateRequest");

const router = express.Router();

router.get(
  "/get",
  validateRequest({ query: listingQuerySchema }),
  listingController.getAllListings
);

router.get(
  "/get/:id", 
  validateRequest({ params: listingParamsSchema }), 
  listingController.getListingById
);

router.post(
  "/create", 
  checkAdminRole, 
  validateRequest({ body: createListingSchema }), 
  listingController.createListing
);

router.put(
  "/update/:id", 
  checkAdminRole, 
  validateRequest({ 
    params: listingParamsSchema,
    body: updateListingSchema
  }), 
  listingController.updateListingById
);

router.delete(
  "/delete/:id", 
  checkAdminRole, 
  validateRequest({ params: listingParamsSchema }), 
  listingController.deleteListingById
);

// router.get("/get", (req, res) => {
//   console.log(req);
//   res.status(200).json({
//     success: true,
//     message: "Success",
//     result: {
//       current_page: 1,
//       data: [
//         {
//           id :4,
//           name: "Starbucks Mid Valley",
//           distance: "0.6",
//           created_at: "2021-03-10 12:24:38",
//           updated_at: "2021-03-10 12:24:38"
//          },
//          {
//           id :9,
//           name: "Burger King",
//           distance: "0.8",
//           created_at: "2021-03-10 12:24:38",
//           updated_at: "2021-03-10 12:24:38"
//          },
//          {
//           id: 16,
//           name: "Pizza Hut",
//           distance: "8.52",
//           created_at: "2021-03-10 12:24:38",
//           updated_at: "2021-03-10 12:24:38"
//          },
//          {
//           id: 25,
//           name: "Sunway Pyramid",
//           distance: "10.81",
//           created_at: "2021-03-10 12:24:38",
//           updated_at: "2021-03-10 12:24:38"
//          }
//       ]
//     }
//   });
// })

module.exports = router;