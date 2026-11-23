'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const icons = ['💼','📁','🏠','💳','🎮','🛒','🔒' ]
    
   let categories = Array(10).fill(0).map((v, idx) => {

  const index = Math.floor(Math.random() * icons.length);
  const randomIcon = icons[index];

  return {
    name: `${randomIcon} ${faker.company.bsNoun()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});


   await queryInterface.bulkInsert('Categories', categories)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
