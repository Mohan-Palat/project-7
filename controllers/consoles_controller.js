const router = require("express").Router();
const Console = require("../models/consoles.js");
const Game = require("../models/games.js");

//isAuthenticated is a flag passed to each render page so that certain options are available if the admin password was correctly entered
//the .sort('name') for the Game model returns the list of games in alphabetical order by name.  This is useful for readability

//INDEX ROUTE
router.get("/", (req, res) => {
	Console.find({}, (error, allConsoles) => {
		res.render("consoles/index.ejs", {
			consoles: allConsoles,
			isAuthenticated: req.session.isAuthenticated,
		});
	});
});

//NEW ROUTE
router.get("/new", async (req, res) => {
	let games = await Game.find().collation({ locale: "en" }).sort({ name: 1 });
	res.render("consoles/new.ejs", {
		games: games,
		isAuthenticated: req.session.isAuthenticated,
	});
});

//SHOW ROUTE
router.get("/:id", async (req, res) => {
	let consoles = await Console.findById(req.params.id).populate("games"); //Looks at the games array of the console document and then populates it with the names of the game
	let games = await Game.find({ id: consoles.games.id }).collation({ locale: "en" }).sort({ name: 1 });

	res.render("consoles/show.ejs", {
		games: games,
		console: consoles,
		isAuthenticated: req.session.isAuthenticated,
	});
});

//POST ROUTE
router.post("/", async (req, res) => {
		let console = await Console.create(req.body); //When the games array within the console document is updated, the order of the array elements are based on game name.
		res.redirect(`/consoles/${console._id}`); //Redirects to the show page of the newly created console.
});

//DELETE
router.delete("/:id", async (req, res) => {
	// const index = req.params.id;
	Console.findByIdAndRemove(req.params.id, (error) => {
		res.redirect("/consoles");
	});
});

//UPDATE
router.put("/:id", async (req, res) => {
	if (!req.body.games) {
		//If all of the games are unchecked
		Console.findByIdAndUpdate(req.params.id, { games: [] }, (error) => {}); //Update the games array on the console document to have 0 items
	}
	//Regardless, update the other elements in the console document
	await Console.findByIdAndUpdate(req.params.id, req.body, (error) => {
		
		res.redirect(`/consoles/${req.params.id}`); //Go back to the previous page
	});
});

//EDIT
router.get("/:id/edit", async (req, res) => {
	let games = await Game.find().collation({ locale: "en" }).sort({ name: 1 });
	let consoles = await Console.findById(req.params.id).populate("games");
	res.render("consoles/edit.ejs", {
		consoles: consoles,
		games,
		isAuthenticated: req.session.isAuthenticated,
	});
});

module.exports = router;
