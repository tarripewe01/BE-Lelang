const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/users");

const secret_key = process.env.REACT_APP_SECRET_KEY;

// Register User
const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    gender,
    address,
    no_ktp,
    no_npwp,
    bank,
    no_rekening,
  } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name,
      phone,
      gender,
      address,
      no_ktp,
      no_npwp,
      bank,
      no_rekening,
    });

    const token = jwt.sign(
      { id: result._id, email: result.email },
      secret_key,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// Login User
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: oldUser._id, email: oldUser.email },
      secret_key,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// Get User By ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    user_path,
    name,
    email,
    password,
    phone,
    gender,
    address,
    no_ktp,
    no_npwp,
    bank,
    no_rekening,
  } = req.body;
  try {
    const updatedUser = {
      user_path,
      name,
      email,
      password,
      phone,
      gender,
      address,
      no_ktp,
      no_npwp,
      bank,
      no_rekening,
      _id: id,
    };

    await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndRemove(id);
    res.json({ message: "User Deleted Successfulyy" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin, getUsers, deleteUser, updateUser, getUserById };
