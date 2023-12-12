import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import User from "../models/User";

// @desc    Get users
// @route   GET /api/users
// @access  public
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});

  if (users) {
    res.status(200).json({
      users,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  public
const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  public
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Private
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(201).json({
      id: user._id,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req: Request, res: Response) => {});

// @desc    Register user
// @route   POST /api/users/register
// @access  Private
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

export { authUser, registerUser, getUsers, getUserById, deleteUser };
