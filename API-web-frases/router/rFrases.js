import { Router } from "express";
import cFrases from "../controllers/cfrases.js";

const routes = Router();

routes.get("/", cFrases.getOne);
routes.get("/all", cFrases.getAll);



export default routes;
