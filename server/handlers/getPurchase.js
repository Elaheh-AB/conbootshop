
"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns an item 
const getPurchaseByUserId = async (req, res) => {
    const userId =req.params.userId;
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "groupproject";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    const result = await db.collection("purchases").findOne({ userId:userId });
    // On success/no error, send
    if (result) {
      return res.status(200).json({ status: 200, userId, message: "success", data: result });
    } else {
      // on failure/error, send
      return res.status(404).json({ status: 404, userId, message: "no purchase Found for this user" });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
    getPurchaseByUserId,
  };
  