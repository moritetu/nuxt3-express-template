import { Sequelize, Options, Op } from 'sequelize'

import { getDatabaseConfig } from './db'

const dbConfig = getDatabaseConfig() as Options
const sequelize = new Sequelize(dbConfig)

export { Op }
export default sequelize
