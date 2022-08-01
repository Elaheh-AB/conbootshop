"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns a list of all items
const getItems = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "groupproject";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    const items = await db.collection("items").find().toArray(); 
    // On success/no error, send
    if (items.length !== 0) {
      return res.status(200).json({ status: 200, data: items });
    } else {
      // on failure/error, send
      return res
        .status(404)
        .json({ status: 404, message: "can't find any item" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  getItems,
};
