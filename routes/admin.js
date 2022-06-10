const express = require("express");
const adminRouter = express.Router();
const admin = require("../models/admin");
const localitor = require("../models/localiteur");
const user = require("../models/user");
//delete user
adminRouter.delete(":/id", async (req, res) => {
  try {
    let result = await user.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "user deleted" });
  } catch (error) {
    console.log(error);
  }
});
//delete localitor
adminRouter.delete(":/id", async (req, res) => {
  try {
    let result = await localitor.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "localitor deleted" });
  } catch (error) {
    console.log(error);
  }
});
module.exports = adminRouter;
