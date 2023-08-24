import { Router } from "express";
import { 
  getAllCarsHandler,
  getCarHandler,
  createCarHandler,
  deleteCarHandler,
  updateCarHandler
} from "./cars.controller";
import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router()

// CREATE
// /api/cars -> POST
router.post('/', isAuthenticated, hasRole(["ADMIN", "DRIVER"]), createCarHandler)

// READ
// /api/cars -> GET
router.get('/', getAllCarsHandler)

// /api/cars/single -> GET
router.get('/single', isAuthenticated, getCarHandler);

// UPDATE
// /api/cars/single -> PATCH/
router.patch('/', isAuthenticated, hasRole(["ADMIN", "DRIVER"]), updateCarHandler);


// DELETE
// /api/cars -> DELETE
router.delete('/', isAuthenticated, hasRole(["ADMIN", "DRIVER"]), deleteCarHandler);

export default router;