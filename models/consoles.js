const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		acquired: { type: String },
		image: { type: String },
		games: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Game",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Console", consoleSchema);
