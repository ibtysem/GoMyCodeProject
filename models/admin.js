const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true },
  numphone: { type: String, require: true },
  adresse: { type: String, require: true },
  isadmin: { type: Boolean, default: false },
});
const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
