const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const localitorSchema = Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true },
  numphone: { type: String, require: true },
  adresse: { type: String, require: true },
  password: { type: String, require: true },
 
});
const localitor = mongoose.model("localitor", localitorSchema);
module.exports = localitor;
