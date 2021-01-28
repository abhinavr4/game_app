var mongoose = require("mongoose");

var flightSchema = new mongoose.Schema({
	origin: String,
	destination: String,
	depTime: String,
	arrTime: String,
	duration: String,
	price: Number
});

module.exports = mongoose.model("Flight", flightSchema);