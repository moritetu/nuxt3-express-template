import express, { Request, Response, RequestHandler, Router, NextFunction } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { HttpError } from '../lib/errors'

export type ResourceType = 'index' | 'show' | 'create' | 'patch' | 'update' | 'destroy'
export type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'

export interface Route {
  path: string
  method?: Method
  handler: RequestHandler | RequestHandler[]
}

export interface Resource {
  id?: string
  path?: string
  beforeAction?: RequestHandler | RequestHandler[]
  types: {
    [k in ResourceType]?: RequestHandler | RequestHandler[]
  }
  afterAction?: RequestHandler | RequestHandler[]
}

export interface Loader {
  id: string
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any | void>
}

export interface RouteConfig {
  routes?: Route[]
  resources?: Resource[]
  loaders?: Loader[]
}

interface AsyncRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>
}

export function asyncWrapper(fn: AsyncRequestHandler): RequestHandler {
  return (req, res, next) => fn(req, res, next).catch(next)
}
export const ash = asyncWrapper

export function createResource(config: RouteConfig, baseRouter?: Router): Router {
  let router = baseRouter
  if (!router) {
    router = express.Router({ caseSensitive: true, mergeParams: true })
  }

  // Mount routes
  if (config.routes) {
    for (const route of config.routes) {
      const { method, path, handler } = route
      const handlers = [handler].flat()
      if (method === 'all') {
        router.use(path, ...handlers)
      } else if (method === 'post') {
        router.post(path, ...handlers)
      } else if (method === 'put') {
        router.put(path, ...handlers)
      } else if (method === 'delete') {
        router.delete(path, ...handlers)
      } else if (method === 'patch') {
        router.patch(path, ...handlers)
      } else if (method === 'options') {
        router.options(path, ...handlers)
      } else if (method === 'head') {
        router.head(path, ...handlers)
      } else {
        router.get(path, ...handlers)
      }
    }
  }

  // Mounts loaders
  if (config.loaders) {
    for (const loader of config.loaders) {
      const { id, handler } = loader
      router.param(id, (req, res, next) => {
        handler(req, res, next)
          .then((value) => {
            if (value === null || value === undefined) {
              return new HttpError(StatusCodes.BAD_REQUEST, getReasonPhrase(StatusCodes.BAD_REQUEST))
            }

            res.locals[id] = value
          })
          .then(next, next)
      })
    }
  }

  // Mounts CRUD
  if (config.resources) {
    for (const resource of config.resources) {
      const id = resource.id || 'id'
      const types = resource.types
      const path = resource.path ?? ''
      const beforeAction = resource.beforeAction ?? []
      const afterAction = resource.afterAction ?? []
      if (types.index) {
        router.get(path, ...[beforeAction, types.index, afterAction].flat())
      }
      if (types.create) {
        router.post(path, ...[beforeAction, types.create, afterAction].flat())
      }
      if (types.show) {
        router.get(`${path}/:${id}`, ...[beforeAction, types.show, afterAction].flat())
      }
      if (types.update) {
        router.put(`${path}/:${id}`, ...[beforeAction, types.update, afterAction].flat())
      }
      if (types.patch) {
        router.patch(`${path}/:${id}`, ...[beforeAction, types.patch, afterAction].flat())
      }
      if (types.destroy) {
        router.delete(`${path}/:${id}`, ...[beforeAction, types.destroy, afterAction].flat())
      }
    }
  }

  return router
}
