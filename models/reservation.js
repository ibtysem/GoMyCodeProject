const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservSchema = Schema({
  checkin: { type: Date, require: true },
  checkout: { type: Date, require: true },
  adult: Number,
  Kids: Number,
  verification: { type: Boolean, default: false },
});
const reserv = mongoose.model("reserv", reservSchema);
module.exports = reserv;
