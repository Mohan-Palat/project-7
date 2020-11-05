//___________________
//Dependencies
//___________________
require("dotenv").config(); //Should always be at the very top of the file so that it can load the environment variables first.
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const expressLayouts = require("express-ejs-layouts");
const router = require("./controllers/consoles_controller.js");
const session = require("express-session");
isAuthenticated = false; //Flag passed to ejs render pages in order for certain items to be viewable
goBack = ""; //Used to redirect back to the previous page when logged in or out
dupe = false; //Used in determining if a game has already been added to the collection
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/" + "project2";
// Connect to Mongo
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));
// open the connection to mongo
db.on("open", () => {});
//___________________
//Middleware
app.set("view engine", "ejs");
app.use(expressLayouts);

//___________________
//use public folder for static assets
app.use(express.static("public"));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form
app.use(
	//Required for using sessions
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

const Console = require("./models/consoles.js");
const Game = require("./models/games.js");

app.use("/consoles", require("./controllers/consoles_controller.js"));
app.use("/games", require("./controllers/games_controller.js"));

//___________________
// Routes
app.post("/login", (req, res) => {
	//Used to determine if password is correct.  If so, authenticate and enable admin functions
	if (req.body.password == process.env.PASSWORD) {
		req.session.isAuthenticated = true;

		return res.redirect(`${goBack}`); //goes back to the page where the Login button was clicked on.
	} else {
		req.session.isAuthenticated = false;
		req.session.stillOpen = false;
		return res.redirect(`${goBack}`); //goes back to the page where the Login button was clicked on.
	}
});
//___________________
//localhost:3000

/*Notes about the below routes:
req.headers["referrer"] - in viewing the req.headers, the "referrer" contains the URL of the page that initiated the request.  This is useful for the goBack command
*/

app.get("/", async (req, res) => {
	let games = await Game.find({ currentlyPlaying: true }).sort('name');
	if (isAuthenticated) {
		req.session.destroy();
	} //Kills any open sessions before authenticating
	res.render("index.ejs", {
		isAuthenticated: req.session.isAuthenticated, //authenticates the admin user
		games,
	});
});
app.get("/login", (req, res) => {
	goBack = req.headers["referer"];
	res.render("login.ejs"); //Page to enter the password
});
app.get("/logout", (req, res) => {
	goBack = req.headers["referer"];
	isAuthenticated = false; //Resets this flag to hide admin features
	req.session.destroy();
	return res.redirect(`${goBack}`);
});
app.get("/search", async (req, res) => {
	let gameResults = await Game.find({
		//searches all games
		name: {
			$regex: req.query.name, //$regex converts the name field from search box on index.ejs to a string
			$options: "i", //case-insensitive search option
		},
	});

	let consoleResults = await Console.find({
		//searches all consoles
		name: { $regex: req.query.name, $options: "i" },
	});

	res.render("search.ejs", {
		games: gameResults,
		consoles: consoleResults,
	});
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));
