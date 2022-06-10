const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true },
  numphone: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, default: "user" },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
