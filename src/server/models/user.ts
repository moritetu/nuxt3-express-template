/* eslint-disable no-use-before-define */
import bcrypt from 'bcrypt'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'

import sequelize from '../lib/sequelize'

const SALT_FOUNDS = 10

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare readonly id: CreationOptional<number>
  declare email: string
  declare password: string
  declare username: string

  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
  declare readonly deletedAt: Date | null

  async validPassword(password: string) {
    let hashedPassword = this.password
    if (!hashedPassword) {
      const user = await User.scope('withSecret').findByPk(this.id, { attributes: ['password'] })
      if (!user || !user?.password) {
        return false
      }
      hashedPassword = user.password
    }

    return await bcrypt.compare(password, hashedPassword)
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: {
          args: [8],
          msg: 'password must be at least 8 characters long',
        },
        is: {
          args: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[A-Za-z\d.#@$!%*?&]+$/i,
          msg: 'password must contain at least one uppercase letter, one lowercase letter and one number',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    paranoid: true,
    underscored: true,
    defaultScope: {
      attributes: { exclude: ['password', 'deletedAt'] },
      order: [['id', 'ASC']],
    },
    scopes: {
      withSecret: {},
    },
  },
)

//
// Hooks
//
User.addHook('beforeCreate', async (instance) => {
  const password = instance.getDataValue('password')
  if (password) {
    const hashedPassword = await encryptPassword(password)
    instance.setDataValue('password', hashedPassword)
  }
})

User.addHook('afterCreate', (instance) => {
  instance.setDataValue('password', '')
})

User.addHook('beforeUpdate', async (instance) => {
  const password = instance.getDataValue('password')
  if (password) {
    const hashedPassword = await encryptPassword(password)
    instance.setDataValue('password', hashedPassword)
  }
})

//
// Utility functions
//
export async function encryptPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, SALT_FOUNDS)
  return hashedPassword
}
