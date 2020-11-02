const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        isDigital: {type: Boolean},
        acquired: {type: String},
        currentlyPlaying: {type: Boolean},
        hasBeaten: {type: Boolean},
        image:{type: String},
        console: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Console",
			},
		],
    }
)


module.exports = mongoose.model("Game", gameSchema)