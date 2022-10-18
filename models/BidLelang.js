const mongoose = require("mongoose");

const bidSchema = mongoose.Schema(
  {
    nominal_bid: {
      type: Number,
    },
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    produk_id:{type: mongoose.Schema.Types.ObjectId, ref: 'product'},
  },
  { timestamps: true }
);

module.exports = mongoose.model("bid", bidSchema);
