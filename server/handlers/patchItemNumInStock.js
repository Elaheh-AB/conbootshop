"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// updates items in the cart with given id
const updateItemNum = async (req, res) => {
  const itemId = parseInt(req.body.itemId); //id of the item
  //number of purchased items to deducted from available num
  //purchasedNo can be positive(for adding) or negative (for removing)
  const purchasedNo = parseInt(req.body.purchasedNo);
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "groupproject";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    //updates the item only if there is availability of that
    const result = await db
      .collection("items")
      .updateOne(
        { _id: itemId, numInStock: { $gte:-purchasedNo } },
        { $inc: { numInStock: purchasedNo } }
      );
    // On success/no error, send
    if (result.acknowledged === true && result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ status: 200, itemId, message: "stock updated successfully" });
    } else {
      // on failure/error, send
      return res
        .status(404)
        .json({ status: 404, itemId, message: "can't update the stock" });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  updateItemNum,
};
