import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import carsRouter from './api/cars';
import userRouter from './api/user';
import authLocalRouter from './auth/local';
import tripsRouter from './api/trips'

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/users', userRouter)
  app.use('/api/cars', carsRouter)
  app.use('/api/trips', tripsRouter)

  //Auth
  app.use('/auth/local', authLocalRouter)
}

export default routes