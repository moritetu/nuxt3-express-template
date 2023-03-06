/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      const now = new Date()

      // users
      await queryInterface.bulkInsert(
        'users',
        [
          {
            email: 'admin@example.com',
            password: await bcrypt.hash('Admin#12345', 10),
            usernamd: 'guest',
            created_at: now,
            updated_at: now,
          },
        ],
        { transaction },
      )
    })
  },

  down(queryInterface) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('users', null, { transaction })
    })
  },
}
