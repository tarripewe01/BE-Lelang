const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidLelangSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    bid: {
        type: Number,
        required: true,
    },
    name:{
        type: String,
    },
    avatar:{
        type: String,
    }
})