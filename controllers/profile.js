const Profile = require("../models/profile");
const User = require("../models/users");

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "email", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

const getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "email",
      "avatar",
    ]);

    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "email", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
};

module.exports = { getProfile, getAllProfile, getProfileById };
