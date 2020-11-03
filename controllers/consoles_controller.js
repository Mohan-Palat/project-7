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
	let games = await Game.find();
	res.render("consoles/new.ejs", {
		game: games,
		isAuthenticated: req.session.isAuthenticated,
	});
});

//SHOW ROUTE
router.get("/:id", async (req, res) => {
	let console = await Console.findById(req.params.id).populate('games');
	
	 res.render("consoles/show.ejs", {
	 		console,
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
	await Console.findByIdAndUpdate(req.params.id, req.body, (error) => {
		res.redirect(`/consoles/${req.params.id}`);
	});
});

//EDIT
router.get("/:id/edit", async (req, res) => {
	let games = await Game.find();
	console.log(games);
	Console.findById(req.params.id, (error, console) => {
		//console.log("Edit", console);
		res.render("consoles/edit.ejs", {
			console,
			games,
			isAuthenticated: req.session.isAuthenticated,
		});
	});
});

module.exports = router;
