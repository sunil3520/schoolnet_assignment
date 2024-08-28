
const express = require("express");

const scoreRoutes = express.Router();

scoreRoutes.get("/scores", async (req, res) => {
    
    res.status(200).send({msg:"hello"});
  });


module.exports = {scoreRoutes}