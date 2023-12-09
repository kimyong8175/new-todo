import express, { Router } from "express";
const router: Router = express.Router();

import {
  getUsers,
  getUserById,
  authUser,
  registerUser,
} from "../controllers/userControllers";

router.get("/:id", getUserById);
router.route("/").get(getUsers).post(registerUser).put().delete();
router.post("/login", authUser);

export default router;
