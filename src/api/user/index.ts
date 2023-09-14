import { Router } from 'express';

import {
  createUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserHandler,
  updateUserHandler,
  getDriversWithoutCarHandler,
  handleUploadImage,
  updateUserByAdmin,
  delteUserByAdmin,
} from './user.controller';
import { isAuthenticated, hasRole } from '../../auth/auth.controller';
import { formData } from '../../middlewares/formData';

const router = Router();

// CREATE
// /api/users -> POST
router.post('/', createUserHandler);
// /api/users/upload-img -> POST
router.post('/upload-img', isAuthenticated, formData('GCN-Avatar'), handleUploadImage )

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
