import { Request, Response } from "express";
import User from "../models/User";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Private
const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.find({ email, password });

  if (user) {
    res.json({
      user,
    });
  }
};

export { authUser };
