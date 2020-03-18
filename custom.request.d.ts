export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mongoDB: string;
    }
  }

  namespace Express {
    interface Request {
      auth?: any;
    }
  }
}