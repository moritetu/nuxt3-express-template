declare global {
  declare module 'express-session' {
    interface SessionData {
      csrfSecret?: string
    }
  }

  declare module 'express-serve-static-core' {
    interface User {
      id: number
      [key: string]: any
    }
    interface Request {
      user?: User
    }
  }
}
