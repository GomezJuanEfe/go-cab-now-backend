import { Router } from "express";
import { 
  getAllCarsHandler,
  createCarHandler
} from "./cars.controller";

const router = Router()

router.get('/', getAllCarsHandler)
router.post('/', createCarHandler)

export default router