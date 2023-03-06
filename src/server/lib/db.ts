import dbconfig from '../config/database.config.json'

export function getDatabaseConfig() {
  const dbConfig = dbconfig as Record<string, any>
  const env = process.env.NODE_ENV || 'development'

  if (!(env in dbConfig)) {
    throw new Error(`database config is not found for ${env}}`)
  }

  return dbConfig[env]
}
