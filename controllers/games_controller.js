const router = require("express").Router();
const Game = require("../models/games.js");

//INDEX ROUTE
router.get("/", async (req, res) => {
	Game.find({}, (error, allGames) => {
		res.render("games/index.ejs", {
			game: allGames,
		});
	});
});

//NEW ROUTE
router.get("/new", (req, res) => {
	res.render("games/new.ejs");	
});

//SHOW ROUTE
router.get("/:id", async (req, res) => {
	Game.findById(req.params.id, (err, game) => {
		//res.render("show.ejs", {game})
		res.send(game);
	});
});

	//POST ROUTE
	router.post("/", async (req, res) => {
        console.log("Post");
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
		let game = await Game.create(req.body);//, (error, createdGame) => {
           // console.log(error, createdGame);
			res.redirect("/games");
		//});
	});

	//DELETE
	router.delete("/:id", async (req, res) => {
		const index = req.params.id;
		Game.findByIdAndRemove(req.params.id, (error) => {
			res.redirect("/games");
		});
	});

	//UPDATE
	router.put("/:id", async (req, res) => {
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
	await	Game.findByIdAndUpdate(req.params.id, req.body, (error, updatedGame) => {
            console.log(req.body, error, updatedGame);
			res.redirect('/games');
		});
	});

	//EDIT
	router.get("/:id/edit", async (req, res) => {
		Game.findById(req.params.id, (error, game) => {
            console.log("Edit", game);
			res.render("games/edit.ejs", {
				game: game,
			});
		});
	});


module.exports = router;
