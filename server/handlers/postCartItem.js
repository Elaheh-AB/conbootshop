"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// add new item to cart
const addCartItem = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    const dbName = "groupproject";
    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    const result = await db
      .collection("cart")
      .insertOne({ ...req.body, _id: uuidv4() });

    // On success/no error, send
    if (result.acknowledged) {
      //send back id to store in local storage
      return res
        .status(201)
        .json({
          status: 201,
          message: "item added to cart",
          cartId: result.insertedId,
        });
    } else {
      // on failure/error, send
      return res.status(404).json({ status: 404, message: "can't add item" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  addCartItem,
};
