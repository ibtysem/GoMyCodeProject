const express = require("express");
const localitorRouter = express.Router();
const localitor = require("../models/localiteur");
const location = require("../models/location");

//post a location
localitorRouter.post("/add", async (req, res) => {
  const { region, nom, surface, numroom, prix, desc, adresse, img, numphone } =
    req.body;
  try {
    const newlocation = new location({
      region,
      nom,
      surface,
      numroom,
      prix,
      desc,
      adresse,
      img,
      numphone,
    });
    let result = await newlocation.save();
    res.send({ location: result, msg: "location added sucssefly" });
  } catch (error) {
    console.log(error);
  }
});
//get all location
localitorRouter.get("/locations", async (req, res) => {
  try {
    let result = await location.find();
    res.send({ locations: result, msg: "get all locations" });
  } catch (error) {
    console.log(error);
  }
});
//get location by id
localitorRouter.get("/:id", async (req, res) => {
  try {
    let result = await location.findById({ _id: req.params.id });
    res.send({ location: result, msg: "get  locations" });
  } catch (error) {
    console.log(error);
  }
});

//update location by id
localitorRouter.put("/:id", async (req, res) => {
  try {
    let result = await location.findByIdAndUpdate(
      {_id: req.params.id, },
      { $set: { ...req.body } }
    );
    res.send({ msg: "location updated" });
  } catch (error) {
    console.log(error);
  }
});
//delete location
localitorRouter.delete("/:id", async (req, res) => {
  try {
    let result = await location.findByIdAndDelete({ _id: req.params.id });
    res.send({ msg: "location deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = localitorRouter;
