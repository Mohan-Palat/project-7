const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        isDigital: {type: Boolean},
        acquired: {type: String},
        currentlyPlaying: {type: Boolean},
        hasBeaten: {type: Boolean},
        image:{type: String},
        maxNumberOfPlayers:{type: String},
        console: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Console",
			},
        ],
        youTubeLink: {type: String}
    }
)


module.exports = mongoose.model("Game", gameSchema)