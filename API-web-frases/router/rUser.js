import { Router } from "express";
import cUser from "../controllers/cUser.js";


const router = Router();

router.post("/login", cUser.getUser);


export default router;
