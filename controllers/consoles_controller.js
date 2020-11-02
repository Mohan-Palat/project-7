const express = require("express");
const router = require("express").Router();
const Console = require("../models/consoles.js");
const Game = require("../models/games.js");

//INDEX ROUTE
router.get("/", (req, res) => {
	Console.find({}, (error, allConsoles) => {
		res.render("consoles/index.ejs", {
			consoles: allConsoles,
		});
	});
});

//NEW ROUTE
router.get("/new", (req, res) => {
	let games = Game.find();
	res.render("consoles/new.ejs", {
		games,
	});
});

//SHOW ROUTE
router.get("/:id", async (req, res) => {
	Console.findById(req.params.id, (err, allConsoles) => {
		//res.render("show.ejs", {game})
		res.render("consoles/show.ejs", {
			console: allConsoles,
		});
	});
});

	//POST ROUTE
	router.post("/", (req, res) => {
		Console.create(req.body, (error, createdConsole) => {
			res.redirect("/consoles");
		});
	});

	//DELETE
	router.delete("/:id", (req, res) => {
		const index = req.params.id;
		Console.findByIdAndRemove(req.params.id, (error) => {
			res.redirect("/consoles");
		});
	});

	//UPDATE
	router.put("/:id", (req, res) => {
		Console.findByIdAndUpdate(req.params.id, req.body, (error) => {
			res.redirect("/consoles");
		});
	});

	//EDIT
	router.get("/:id/edit", (req, res) => {
		Console.findById(req.params.id, (error, console) => {
			res.render("edit.ejs", {
				console: console,
			});
		});
	});


module.exports = router;
