import { Router } from "express";
import { handlePayment } from "./payment.controller";
import { handleCreatePayment } from "./payment.controller";

const router = Router();

router.post("/", handlePayment)
router.post("/create-payment", handleCreatePayment)

export default router;
