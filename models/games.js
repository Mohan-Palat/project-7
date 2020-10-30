const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        isDigital: {type: Boolean, default: false},
        acquired: {type: String},
        currentlyPlaying: {type: Boolean},
    }
)


module.exports = mongoose.model("Game", gameSchema)