import { Router } from 'express';

import {
  createUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserHandler,
  updateUserHandler,
  getDriversWithoutCarHandler,
  updateUserByAdmin,
  delteUserByAdmin,
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
// /api/users/drivers-without-car
router.get('/drivers-without-car', isAuthenticated, hasRole(['ADMIN']), getDriversWithoutCarHandler)

// UPDATE
// /api/users/single -> PATCH
router.patch('/single', isAuthenticated, updateUserHandler);
// /api/users -> PATCH
router.patch('/', isAuthenticated, hasRole(['ADMIN']), updateUserByAdmin)

// /api/users -> DELETE
// DELETE
router.delete('/', isAuthenticated, deleteUserHandler);
router.delete('/:email', isAuthenticated,hasRole(['ADMIN']), delteUserByAdmin);



export default router;
