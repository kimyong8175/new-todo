import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import User from "../models/User";
import { identifierToKeywordKind } from "typescript";

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
    res.status(400);
    throw new Error("No users");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  public
const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = await User.findById(id);

  if (user) {
    res.status(200).json({
      user,
    });
  } else {
    res.status(400);
    throw new Error("No user");
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

export { authUser, registerUser, getUsers, getUserById };
