import { Router } from 'express';

import {
  createUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserHandler,
  updateUserHandler,
} from './user.controller';
import { isAuthenticated, hasRole } from '../../auth/auth.controller';

const router = Router();

// CREATE
// /api/users -> POST
router.post('/', createUserHandler);

// READ
// /api/users -> GET
router.get('/', isAuthenticated, hasRole(['ADMIN']), getAllUserHandler);
// /api/users/single -> GET
router.get('/single', isAuthenticated, getUserHandler);

// UPDATE
// /api/users/single -> PATCH
router.patch('/single', isAuthenticated, updateUserHandler);

// DELETE
// /api/users -> DELETE
router.delete('/', isAuthenticated, deleteUserHandler);


export default router;
