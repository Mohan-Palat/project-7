const router = require("express").Router();
const Game = require("../models/games.js");
// const isAuthenticated=process.env.PASSWORD;

//INDEX ROUTE
router.get("/", async (req, res) => {
	Game.find({}, (error, allGames) => {
		res.render("games/index.ejs", {
			games: allGames,
		});
	});
});

//NEW ROUTE
router.get("/new", (req, res) => {
	res.render("games/new.ejs");
});

//SHOW ROUTE
router.get("/:id", async (req, res) => {
	Game.findById(req.params.id, (err, allGames) => {
		//res.render("show.ejs", {game})
		res.render("games/show.ejs", {
			game: allGames,
		});
	});
});

//POST ROUTE
router.post("/", async (req, res) => {
	if (req.body.isDigital == "on") {
		req.body.isDigital = true;
	} else {
		req.body.isDigital = false;
	}
	if (req.body.currentlyPlaying == "on") {
		req.body.currentlyPlaying = true;
	} else {
		req.body.currentlyPlaying = false;
	}
	if (req.body.hasBeaten == "on") {
		req.body.hasBeaten = true;
	} else {
		req.body.hasBeaten = false;
	}
	let game = await Game.create(req.body);
	res.redirect(`/games/${game._id}`); //Redirects to the page of the newly created game
});

//DELETE
router.delete("/:id", async (req, res) => {
	// const index = req.params.id;
	Game.findByIdAndRemove(req.params.id, (error) => {
		res.redirect("/games");
	});
});

//UPDATE
router.put("/:id", async (req, res) => {
	let id = req.params.id;
	if (req.body.isDigital === "on") {
		req.body.isDigital = true;
	} else {
		req.body.isDigital = false;
	}
	console.log("isDigital");
	if (req.body.currentlyPlaying === "on") {
		req.body.currentlyPlaying = true;
	} else {
		req.body.currentlyPlaying = false;
	}
	console.log("currentlyPlaying");
	if (req.body.hasBeaten === "on") {
		req.body.hasBeaten = true;
	} else {
		req.body.hasBeaten = false;
	}
	await Game.findByIdAndUpdate(
		req.params.id,
		req.body,
		(error, updatedGame) => {
			res.redirect(`/games/${req.params.id}`);
		}
	);
});

//EDIT
router.get("/:id/edit", async (req, res) => {
	Game.findById(req.params.id, (error, game) => {
		console.log("Edit", game);
		res.render("games/edit.ejs", {
			game,
		});
	});
});

module.exports = router;
