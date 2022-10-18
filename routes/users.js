const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} = require("../controllers/user");

router.post("/register", signup);
router.post("/login", signin);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
