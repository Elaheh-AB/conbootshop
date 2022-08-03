"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;
const { getItems } = require("./handlers/getItems");
const { getRandomItems } = require("./handlers/getRandomItems");
const { getItemById } = require("./handlers/getItemById");
const { addCartItem } = require("./handlers/postCartItem");
const { getCompanyById } = require("./handlers/getCompany");
const { updateCart } = require("./handlers/patchCartItem");
const { getOnSaleItems } = require("./handlers/getOnSaleItems");
const { updateItemNum } = require("./handlers/patchItemNumInStock");
const { getCartById } = require("./handlers/getCartById");
const { addPurchase } = require("./handlers/postPurchase");
const { getPurchaseByUserId } = require("./handlers/getPurchase");
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
  .get("/api/get-random-items", getRandomItems)
  .get("/api/get-onSale-items", getOnSaleItems)
  .get("/api/get-item/:itemId", getItemById)
  .get("/api/get-cart/:cartId", getCartById)
  .get("/api/get-purchase/:userId", getPurchaseByUserId)
  .post("/api/add-cart-item", addCartItem)
  .post("/api/add-purchase", addPurchase)
  .get("/api/get-company/:companyId", getCompanyById)
  .patch("/api/update-cart", updateCart)
  .patch("/api/update-item-num", updateItemNum)
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
