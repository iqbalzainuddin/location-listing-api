const { User } = require("@/models");
const ApiError = require("@/utils/classes/ApiError");

const createUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ 
      where: { email: userData.email } 
    });
    if (existingUser) {
      throw new ApiError(400, "User with this email already exist");
    }
    return await User.create(userData);
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Server Error", error);
  }
}

const findOneUser = async (condition, exclude = ["password"]) => {
  return await User.findOne({
    where: condition,
    attributes: { exclude }
  });
}

module.exports = {
  createUser,
  findOneUser
};
