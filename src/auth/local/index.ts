import { Router } from 'express'

import { loginHandler, activeAccountHandler } from './local.controller'

const route = Router()

// Login -> POST /auth/local/login
route.post('/login', loginHandler)

// Active account -> GET /auth/local/activate-account/:token
route.get('/activate-account/:token', activeAccountHandler)

//change password
//reset password
//lougout

export default route