const express = require("express");
const { UserModel } = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
    const {email,password}= req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      const hash = await bcrypt.hash(password, 2);

      let userDetail = new UserModel({
        email,
        password: hash,
      });

      userDetail = await userDetail.save();

      res.status(201).send({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server error" });
  }
});



userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ msg: "Incorrect password" });
    }

    const token = jwt.sign(user, "sunil", {
      expiresIn: "1h",
    });

    res.status(200).send({
      msg: "Login successful",
      token: token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = { userRoutes };
