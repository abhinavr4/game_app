var mongoose = require("mongoose");

var ticketSchema = new mongoose.Schema({
	tUser: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	tFlight: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Flight"
		}
	]
});

module.exports = mongoose.model("Ticket", ticketSchema);