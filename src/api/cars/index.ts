import { Router } from "express";
import { 
  getAllCarsHandler,
  getCarHandler,
  createCarHandler,
  deleteCarHandler,
  updateCarHandler,
  getAllCarsPaginatedHandler,
} from "./cars.controller";
import { isAuthenticated, hasRole } from "../../auth/auth.controller";
import { formData } from '../../middlewares/formData';

const router = Router()

// CREATE
// /api/cars -> POST
router.post('/', isAuthenticated, hasRole(["ADMIN", "DRIVER"]), formData('GCN-NewCar'), createCarHandler);
// READ
// /api/cars -> GET
router.get('/', getAllCarsHandler);
// /api/cars/paginated -> GET
router.get('/paginated', getAllCarsPaginatedHandler);
// /api/cars/single -> GET
router.get('/single/:id', isAuthenticated, getCarHandler);
// UPDATE
// /api/cars/single -> PATCH/
router.patch('/:id', isAuthenticated, hasRole(["ADMIN", "DRIVER"]), formData('GCN-NewCar'), updateCarHandler);

// DELETE
// /api/cars -> DELETE
router.delete('/:id', isAuthenticated, hasRole(["ADMIN", "DRIVER"]), deleteCarHandler);

export default router;