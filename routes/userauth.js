const express = require("express");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuthRouter = express.Router();

const {
  registerRules,
  loginRules,
  validation,
} = require("../middliware/validator");
const isAuth = require("../middliware/passport");
//register
userAuthRouter.post(
  "/registeruser",
  registerRules(),
  validation,
  async (req, res) => {
    const { firstname, lastname, numphone, email, password,role } = req.body;
    try {
      const newuserAuth = new user({
        firstname,
        lastname,
        numphone,
        email,
        password,
        role,
      });
      //checkif the email exict
      const searchUser = await user.findOne({ email });
      if (searchUser) {
        return res.send({ msg: "email already exist" });
      }
      //hash password
      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const hashedPassword = await bcrypt.hash(password, genSalt);
      console.log(hashedPassword);
      newuserAuth.password = hashedPassword;
      //generate a token
      //save the userauth
      const newusertoken = await newuserAuth.save();
      const payload = {
        _id: newusertoken._id,
        name: newusertoken.lastname,
      };
      var token = await jwt.sign(payload, process.env.secretOrToken, {
        expiresIn: 3600,
      });
      console.log(token);
      res.status(200).send({
        newusertoken,
        msg: "userAuth is saved",
        token: "Bearer " + token,
      });
    } catch (error) {
      console.log(error);
    }
  }
);
//login
userAuthRouter.post(
  "/loginuser",
  loginRules(),
  validation,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      //find if the user exist
      const searchUser = await user.findOne({ email });
      //if the email not exist
      if (!searchUser) {
        return res.send({ msg: "bad credentiel" });
      }
      //password are equals
      const match = await bcrypt.compare(password, searchUser.password);
      if (!match) {
        return res.send({ msg: "bad credentiel" });
      }
      //cree a token
      const payload = {
        _id: searchUser._id,
        name: searchUser.lastname,
      };
      var token = await jwt.sign(payload, process.env.secretOrToken, {
        expiresIn: 3600,
      });
      console.log(token);
      //send the user
      res.status(200).send({ user: searchUser, msg: "sucsses", token: "Bearer " + token });
    } catch (error) {
      console.log(error);
    }
  }
);
userAuthRouter.get("/current", isAuth(), (req, res) => {
  try {
    res.send({ userr: req.user });
  } catch (error) {
    console.log(error);
  }
});
module.exports = userAuthRouter;
