import express from 'express'

import helloRoutes from '../controllers/hello'
import { errorHandler as defaultErrorHandler, PageNotFoundHandler } from '../middlewares/errorHandler'
import { createResource } from '../routes/resourceHelper'

export default (app: express.Application) => {
  const router = express.Router({ caseSensitive: true, mergeParams: true })
  router.use('/hello', createResource(helloRoutes))

  // Mount with version
  router.use(PageNotFoundHandler)
  router.use(defaultErrorHandler)

  app.use('/server/api', router)
}
