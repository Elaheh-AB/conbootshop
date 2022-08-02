


const e = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//creating companies data
const createSaleAtt = async () => {
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
    .collection("items")
    .updateMany(
      {},{ $set: {onSale: false }} ,{upsert:false,
        multi:true}
    );

    // On success/no error, send
    if (result.acknowledged) {
      console.log("success");
    } else {
      // on failure/error, send
      console.log("failure");
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};
createSaleAtt();

