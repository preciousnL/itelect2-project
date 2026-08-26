'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    
    await queryInterface.bulkInsert('Users', [
      { name: 'Precious Nicole', email: 'pn@email.test',
        createdAt: now, updatedAt: now },
      { name: 'Umiko Myron', email: 'um@email.test',
        createdAt: now, updatedAt: now },
      { name: 'Paul Geneo', email: 'pg@email.test',
        createdAt: now, updatedAt: now }
    ]);

    const Users = await queryInterface.sequelize.query(
    'SELECT id, name FROM "Users";',
    { type: Sequelize.QueryTypes.SELECT }
    );

    const idOf = (name) => Users.find((a) => a.name === name).id;

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Graded Task 1', dueDate: new Date(), userId: idOf('Precious Nicole'), createdAt: now, updatedAt: now, completed: false },
      { title: 'Graded Task 2', dueDate: new Date(), userId: idOf('Precious Nicole'), createdAt: now, updatedAt: now, completed: false },
      { title: 'Graded Task 3', dueDate: new Date(), userId: idOf('Umiko Myron'), createdAt: now, updatedAt: now, completed: false },
      { title: 'Graded Task 4', dueDate: new Date(), userId: idOf('Paul Geneo'), createdAt: now, updatedAt: now, completed: false }
      ]);
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
