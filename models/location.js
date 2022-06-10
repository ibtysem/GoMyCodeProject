const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = Schema({
  region: { type: String, require: true },
  nom: { type: String, require: true },
  surface: { type: Number, require: true },
  numroom: { type: Number, require: true },
  prix: { type: Number, require: true },
  desc: { type: String, require: true },
  adressse: { type: String, require: true },
  img: { type: String },
  numphone: { type: String, require: true },
});
const location = mongoose.model("location", locationSchema);
module.exports = location;
