"use strict";
const ConvertHandler = require("../controllers/convertHandler.js");
const router = require("express").Router();

let convertHandler = new ConvertHandler();

router.get("/convert", (req, res) => {
  const response = convertHandler.getResponse(req.query.input);

  res.status(200).send(response);

});

module.exports = router