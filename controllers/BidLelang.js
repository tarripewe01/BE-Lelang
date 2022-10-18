const BidModel = require("../models/BidLelang");

const createBid = async (req, res) => {
  const newBid = new BidModel(req.body);

  try {
    const savedBid = await newBid.save();
    res.status(200).json(savedBid);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getBids = async (req, res) => {
  try {
    const bid = await BidModel.find();
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getBidById = async (req, res) => {
  const { id } = req.params;

  try {
    const bid = await BidModel.findById(id);
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {createBid, getBids, getBidById}