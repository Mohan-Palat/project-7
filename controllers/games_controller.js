const express = require("express");
const router = require("express").Router();
const Game = require("../models/games.js");

//INDEX ROUTE
router.get("/", (req, res) =>{
    Game.find({}, (error, allGames) =>{
        res.render("games/index.ejs",{
            game: allGames,
        });
    });
});

//NEW ROUTE
router.get('/new', (req, res) =>{
    res.render("games/new.ejs");
});

//SHOW ROUTE
router.get("/:id", (req, res) =>{
Game.findById(req.params.id, (err, game) =>{
    res.render("show.ejs", {game})
})
});

module.exports = router;