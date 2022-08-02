"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns onSale items
const getOnSaleItems = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "groupproject";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    //only return an item if its onSale value is greater than 0%
    const items = await db.collection("items").find({ onSale:{ $gt: 0 } }).toArray();
    // On success/no error, send
    if (items.length!==0) {
      res.status(200).json({ status: 200,message:"onSale items found", data: items });
    } else {
      // on failure/error, send
      return res
        .status(404)
        .json({ status: 404, message: "no onSale item found" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  getOnSaleItems,
};
