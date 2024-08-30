'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    //check if data already exist
    const admins = await queryInterface.sequelize.query(
      'SELECT * FROM users WHERE "isAdmin" = true',
      { type: QueryTypes.SELECT }
    );
    if (admins.length > 0) {
      console.log(
        'There are already admin users in the table. Skipping seeding...'
      );
      return;
    }

    const userId = uuidv4();
    const securityId = uuidv4();

    await queryInterface.bulkInsert(
      'users',
      [
        {
          userId,
          firstName: 'Chidera',
          lastName: 'Anichebe',
          email: 'dera@ieee.org',
          profileImage:
            'https://res.cloudinary.com/taliot/image/upload/v1697199168/assets/landing_page/rbcmrygjs9edq5qbnh9p.png',
          isAdmin: true,
          isAccountActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'securities',
      [
        {
          securityId,
          userId,
          password:
            '$2a$12$rDGHW3PnhdKP10f5seBG9utH80Jyg5veSp6ZWHTehBsYn1nv.1ZIu', //S3cureBlog
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // on bringing down the seeder, clear only the data seeded
    await queryInterface.bulkDelete('users', { email: 'dera@ieee.org' }, {});
    await queryInterface.bulkDelete(
      'securities',
      {
        password:
          '$2a$12$rDGHW3PnhdKP10f5seBG9utH80Jyg5veSp6ZWHTehBsYn1nv.1ZIu',
      },
      {}
    );
  },
};
