'use strict'

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.DataTypes.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.DataTypes.STRING, allowNull: false },
      usernamd: { type: Sequelize.DataTypes.STRING },
      created_at: { type: Sequelize.DataTypes.DATE, defaultValue: Sequelize.DataTypes.NOW, allowNull: false },
      updated_at: { type: Sequelize.DataTypes.DATE, defaultValue: Sequelize.DataTypes.NOW, allowNull: false },
      deleted_at: { type: Sequelize.DataTypes.DATE },
    })
  },

  down: async function (queryInterface) {
    await queryInterface.dropTable('users')
  },
}
