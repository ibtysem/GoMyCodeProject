const express = require("express");
const reserv = require("../models/reservation");
const userRouter = express.Router();

//add reservation
userRouter.post("/addreserv", async (req, res) => {
  try {
    const newresesrv = new reserv(req.body);
    let result = await newresesrv.save();
    res.send({ reserv: result, msg: "reservation added" });
  } catch (error) {
    console.log(error);
  }
});
//update reservation
userRouter.put("/:id", async (req, res) => {
  try {
    let result = await resesrv.findByIdAndUpdate({
      _id: req.params.id,
      $set: { ...req.body },
    });
    res.send({ msg: "reservation updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete reservation
userRouter.delete("/:id", async (req, res) => {
  try {
    let result = await resesrv.findByIdAndDelete({
      _id: req.params.id,
    });
    res.send({ msg: "reservation deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
