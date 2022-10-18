const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  // favorite,
  // unfavorite,
  createBid,
} = require("../controllers/product");
const upload = require("../middleware/upload");

router.post("/", upload.any("photo_path"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.any("photo_path"), updateProduct);
router.delete("/:id", deleteProduct);
// router.put("/favorite/:id", favorite);
// router.put("/unfavorite/:id", auth, unfavorite);
router.post("/bid", createBid);

module.exports = router;
