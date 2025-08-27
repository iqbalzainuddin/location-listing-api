'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Listing.init({
    name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Listing",
    tableName: "listings",
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  Listing.associate = (models) => {
    Listing.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "author"
    })
  };
  return Listing;
};