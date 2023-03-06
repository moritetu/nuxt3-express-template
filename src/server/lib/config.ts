import config from 'config'

export function getConfig<T = any>(key: string, defaultValue: T): T {
  if (config.has(key)) {
    return config.get<T>(key)
  }
  return defaultValue
}

export default config
