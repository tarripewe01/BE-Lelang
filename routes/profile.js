const express = require("express");
const router = express.Router();

const Profile = require("../models/profile");
const User = require("../models/users");

const { check, validationResult } = require("express-validator");

const {
  getProfile,
  getAllProfile,
  getProfileById,
} = require("../controllers/profile");

const auth = require("../middleware/auth");

router.get("/me", auth, getProfile);
router.get("/", getAllProfile);
router.get("/user/:user_id", getProfileById);
router.post(
  "/",
  [
    auth,
    [
      check("phone", "Phone is required").not().isEmpty(),
      check("address", "Address is required").not().isEmpty(),
      check("no_ktp", "No KTP is required").not().isEmpty(),
      check("no_rekening", "No Rekening is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, gender, address, no_ktp, no_npwp, bank, no_rekening } =
      req.body;

    //   Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (phone) profileFields.phone = phone;
    if (gender) profileFields.gender = gender;
    if (address) profileFields.address = address;
    if (no_ktp) profileFields.no_ktp = no_ktp;
    if (no_npwp) profileFields.no_npwp = no_npwp;
    if (bank) profileFields.bank = bank;
    if (no_rekening) profileFields.no_rekening = no_rekening;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //   Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //   Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);
router.delete("/", auth, async (req, res) => {
  try {
    //   Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //   Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
