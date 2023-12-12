import express, { Router } from "express";
const router: Router = express.Router();

import {
  getUsers,
  getUserById,
  authUser,
  registerUser,
  deleteUser,
} from "../controllers/userControllers";

router.route("/:id").get(getUserById).delete(deleteUser);
router.route("/").get(getUsers).post(registerUser);
router.post("/login", authUser);

export default router;
