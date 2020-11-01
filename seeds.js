const mongoose = require("mongoose");
const Game = require("./models/games");
const Console = require("./models/consoles");
const mongoURI = 'mongodb://localhost/project2';
mongoose.connect(
	mongoURI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	() => {
		console.log("the connection with mongod is established");
	}
);
async function seed() {
	//async and await are the most succinct way to write promises (waiting for something to finish)
	//To drop collections and re-seed with fresh data
	// await mongoose.connection.dropCollection("movies");
	// await mongoose.connection.dropCollection("actors");

	// CREATE TWO GAMES
	const smm2 = await Game.create({
		name: "Super Mario Maker 2",
        isDigital: true,
        acquired: "2019",
        currentlyPlaying: true,
        hasBeaten: false,
	});
	const zelda = await Game.create({
		name: "Legend of Zelda",
        isDigital: false,
        acquired: "2017",
        currentlyPlaying: true,
        hasBeaten: false,
	});
	// CREATE A CONSOLE
	const switchh = new Console({
		name: "Nintendo Switch",
		acquired: "2017",
		img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aarons.com%2Fnintendo-switch-32gb-console-7339JZF.html&psig=AOvVaw2AIe0Ejjbp2YhXkRi11wVX&ust=1604169918171000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD95eL83OwCFQAAAAAdAAAAABAO",
		games: []
	});
	// // PUSH THE ACTORS ONTO THE MOVIE'S
	// // ACTORS ARRAY
	switchh.games.push(smm2);
	switchh.games.push(zelda);
	
	switchh.save(function (err, savedSwitch) {
		if (err) {
			console.log(err);
		} else {
			console.log("Console is ", savedSwitch);
		}
    });
    break;
}
seed();
