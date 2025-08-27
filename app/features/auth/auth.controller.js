const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { jwt: jwt_env } = require("@/config/environment");
const userService = require("@/features/users/users.service");
const ApiError = require("@/utils/classes/ApiError");
const { successResponse } = require("@/utils/functions/apiResponse");

const login = async (req, res, next) => {
  try {
    const { email, password } =  req.body;
    const user = await userService.findOneUser(
      {
        email,
      },
      []
    );
  
    if (!user) {
      throw new ApiError(400, "User does not exist!");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new ApiError(401, "Password does not matched!");
    }

    const access_token = jwt.sign(
      {
        id: user.id,
        role_type: user.role_type
      },
      jwt_env.secret_key,
      {
        expiresIn: "4h"
      }
    );

    const resBody = {
      user_id: user.id,
      access_token,
      token_type: "Bearer",
      role_type: user.role_type,
      expires_at: new Date(jwt.decode(access_token).exp * 1000).toLocaleString("en-MY", {
        hour12: false
      })
    };

    return successResponse(
      res,
      "Logged in",
      200,
      resBody
    );
  } catch (error) {
    next(error);
  }
}

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      role_type: "u"
    });
    const plainUser = user.get({ plain: true })
    
    delete plainUser.password;

    return successResponse(
      res,
      "User created successfully.",
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  register
};