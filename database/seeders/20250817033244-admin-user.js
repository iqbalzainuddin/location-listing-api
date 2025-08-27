'use strict';

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    // Destructured details from env
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    // Validation
    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Missing required env variables: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD");
    }

    await queryInterface.bulkInsert('users', [{
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: bcrypt.hashSync(ADMIN_PASSWORD),
      role_type: "a",
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', { email: process.env.ADMIN_EMAIL });
  }
};
