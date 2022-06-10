const express = require("express");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuthRouter = express.Router();

const { registerRules, validation } = require("../middliware/validator");
const isAuth = require("../middliware/passport");
//register
userAuthRouter.post(
  "/registerlocalitor",
  registerRules(),
  validation,
  async (req, res) => {
    const { firstname, lastname, numphone, email, password, role } = req.body;
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
      res.send({
        newusertoken,
        msg: "localAuth is saved",
        token: "Bearer" + token,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = userAuthRouter;
