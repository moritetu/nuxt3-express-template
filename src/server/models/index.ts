import sequelize, { Op } from '../lib/sequelize'

import { User } from './user'

export * from './user'

export function setupModels() {
  // NOTE: Foreign key must be defined in both model association.
  // See https://github.com/sequelize/sequelize/issues/5828
  const models = {
    User,
  }

  Object.entries(models).forEach(([_key, model]) => {
    sequelize.modelManager.addModel(model)
  })

  return models
}

const models = setupModels()

export { sequelize, Op, models }
