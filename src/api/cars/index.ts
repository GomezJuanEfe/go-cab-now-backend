import { Router } from "express";
import { 
  getAllCarsHandler,
  getCarHandler,
  createCarHandler,
  deleteCarHandler,
  updateCarHandler,
  getAllCarsPaginatedHandler
} from "./cars.controller";
import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router()

// CREATE
// /api/cars -> POST
router.post('/', isAuthenticated, hasRole(["ADMIN", "DRIVER"]), createCarHandler);

// READ
// /api/cars -> GET
router.get('/', getAllCarsHandler);
// /api/cars/paginated -> GET
router.get('/paginated', getAllCarsPaginatedHandler);

// /api/cars/single -> GET
router.get('/single', isAuthenticated, getCarHandler);

// UPDATE
// /api/cars/single -> PATCH/
router.patch('/single', isAuthenticated, hasRole(["ADMIN", "DRIVER"]), updateCarHandler);


// DELETE
// /api/cars -> DELETE
router.delete('/:id', isAuthenticated, hasRole(["ADMIN", "DRIVER"]), deleteCarHandler);

export default router;