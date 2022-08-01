"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCompanyById = async (req, res) => {
  const companyId = parseInt(req.params.companyId);
  const client = new MongoClient(MONGO_URI, options);

  try {
    //connect to db
    await client.connect();

    const db = client.db("groupproject");
    console.log("connected");

    const result = await db.collection("companies").findOne({ _id: companyId });

    console.log(result);

    if (result) {
      res.status(200).json({ status: 200, data: result });
    }
    res.status(404).json({ status: 404, message: "company not found" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

module.exports = { getCompanyById };
