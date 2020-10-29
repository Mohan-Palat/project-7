const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        acquired: {type: String},
        currentlyPlaying: {type: boolean},
    }
)


module.exports = mongoose.model("Game", gameSchema)