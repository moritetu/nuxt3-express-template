import { RouteConfig } from '../routes/resourceHelper'

import type { Request, Response, NextFunction } from 'express'

export function say(_req: Request, res: Response, _next: NextFunction) {
  res.json({ message: 'Hello World' })
}

// Mounted in routes.ts
export const routes: RouteConfig = {
  routes: [{ method: 'get', path: '/say', handler: say }],
}

export default routes
