const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  image: {
    type: String,
    contentType: String,
  },
});

module.exports = mongoose.model("image", imageSchema);
