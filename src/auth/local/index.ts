import { Router } from 'express'

import { 
  loginHandler,
  activeAccountHandler,
  generateTokenForgotPassword,
  checkTokenForgotPassword,
  resetPassword
} from './local.controller'

const route = Router()

// Login -> POST /auth/local/login
route.post('/login', loginHandler)

// Active account -> GET /auth/local/activate-account/:token
route.get('/activate-account/:token', activeAccountHandler)

// Forgot password -> GET /auth/local/generate-token-forgot-password/:email
route.get('/generate-token-forgot-password/:email', generateTokenForgotPassword)
// Check Token to reset password -> GET /auth/local/check-token-forgot-password/:token
route.get('/check-token-forgot-password/:token', checkTokenForgotPassword)
// Reset Password -> POST /auth/local/reset-password/:token
route.post('/reset-password/:token', resetPassword)

export default route