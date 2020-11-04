const router = require("express").Router();
const Console = require("../models/consoles.js");
const Game = require("../models/games.js");

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
	let games = await Game.find().sort('name');
	res.render("consoles/new.ejs", {
		games: games,
		isAuthenticated: req.session.isAuthenticated,
	});
});

//SHOW ROUTE
router.get("/:id", async (req, res) => {
	let consoles = await Console.findById(req.params.id).populate("games").sort('console.games.name');
	let games = await Game.find({id: consoles.games.id,}).sort('name');
	// res.send(games);
	// console.log(games);
	res.render("consoles/show.ejs", {
		games: games,
		console: consoles,
		isAuthenticated: req.session.isAuthenticated,
	});
});

//POST ROUTE
router.post("/", async (req, res) => {
	let console = await Console.create(req.body);
	res.redirect(`/consoles/${console._id}`);
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
		//console.log("req.body", req.body);
		res.redirect(`/consoles/${req.params.id}`); //Go back to the previous page
	});
});

//EDIT
router.get("/:id/edit", async (req, res) => {
	let games = await Game.find().sort('name');
	let consoles = await Console.findById(req.params.id).populate("games");
	console.log(consoles.games);
	res.render("consoles/edit.ejs", {
		consoles: consoles,
		games,
		isAuthenticated: req.session.isAuthenticated,
	});
});

module.exports = router;
