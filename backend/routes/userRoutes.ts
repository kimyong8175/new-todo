import express, { Router } from "express";
const router: Router = express.Router();

import { authUser } from "../controllers/userControllers";

router.get("/login", authUser);

export default router;
