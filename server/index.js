"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;
const { getItems } = require("./handlers/getItems");
const { getItemById } = require("./handlers/getItemById");
const { getNumOfItems } = require("./handlers/getNumOfItems");
const { addCartItem } = require("./handlers/postCartItem");
const { getCompanyById } = require("./handlers/getCompany");
express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))
  .get("/api/get-items", getItems)
  .get("/api/get-item/:itemId", getItemById)
  .get("/api/get-some-items", getNumOfItems)
  .post("/api/add-cart-item", addCartItem)
  .get("/api/get-company/:companyId", getCompanyById)
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
