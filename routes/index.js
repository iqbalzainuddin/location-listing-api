const express = require("express");

const listingRoutes = require("@/features/listings/listings.route");
const authRoutes = require("@/features/auth/auth.route");
const authorize = require("@/middleware/authorize");

const router = express.Router();

router.use("/listing", authorize, listingRoutes);
router.use("/auth", authRoutes);

module.exports = router;