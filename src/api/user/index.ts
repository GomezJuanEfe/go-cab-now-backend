import { Router } from 'express';

import {
  createUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserHandler,
  updateUserHandler,
} from './user.controller';
import { isAuthenticated } from '../../auth/auth.controller';

const router = Router();

// /api/users -> GET
router.get('/', isAuthenticated, getAllUserHandler);

// /api/users -> POST
router.post('/', createUserHandler);

// /api/users/single -> GET
router.get('/single', isAuthenticated, getUserHandler);

// /api/users -> DELETE
router.delete('/', isAuthenticated, deleteUserHandler);

// /api/users/single -> PATCH
router.patch('/single', isAuthenticated, updateUserHandler);

export default router;
