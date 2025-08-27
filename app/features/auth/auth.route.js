const express = require("express");

const authController = require("@/features/auth/auth.controller");
const validateRequest = require("@/middleware/validateRequest");
const { registerBodySchema, loginBodySchema } = require("@/features/auth/auth.validation");

const router = express.Router();

router.post("/login", validateRequest({ body: loginBodySchema }), authController.login);
router.post("/register", validateRequest({ body: registerBodySchema }), authController.register);

module.exports = router;