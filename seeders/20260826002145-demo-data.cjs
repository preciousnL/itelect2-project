'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const admin = await bcrypt.hash('admin123', 10);
    const member = await bcrypt.hash('member123', 10);
    
    await queryInterface.bulkInsert('Users', [
      { name: 'Nicole', email: 'n@email.test', password: admin, role: 'admin', createdAt: now, updatedAt: now },
      { name: 'Myron', email: 'm@email.test', password: member, role: 'member', createdAt: now, updatedAt: now },
      { name: 'Geneo', email: 'g@email.test', password: member, role: 'member', createdAt: now, updatedAt: now }
    ]);

    const Users = await queryInterface.sequelize.query(
    'SELECT id, name FROM "Users";',
    { type: Sequelize.QueryTypes.SELECT }
    );

    const idOf = (name) => Users.find((a) => a.name === name).id;

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Graded Task 1: Updated', dueDate: new Date(), userId: idOf('Nicole'), createdAt: now, updatedAt: now, completed: false },
      { title: 'Graded Task 2: Updated', dueDate: new Date(), userId: idOf('Nicole'), createdAt: now, updatedAt: now, completed: false },
      { title: 'Graded Task 3: Updated', dueDate: new Date(), userId: idOf('Myron'), createdAt: now, updatedAt: now, completed: false },
      { title: 'Graded Task 4: Updated', dueDate: new Date(), userId: idOf('Geneo'), createdAt: now, updatedAt: now, completed: false }
      ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};