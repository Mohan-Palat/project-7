const express = require("express");
const router = require("express").Router();
const Console = require("../models/consoles.js");

//INDEX ROUTE
router.get("/", (req, res) =>{
    Console.find({}, (error, allConsoles) =>{
        res.render("consoles/index.ejs",{
            console: allConsoles,
        });
    });
});

//NEW ROUTE
router.get('/new', (req, res) =>{
    res.render("consoles/new.ejs");
});

//SHOW ROUTE
router.get("/:id", (req, res) =>{
Console.findById(req.params.id, (err, console) =>{
    res.render("show.ejs", {console})
})
});

module.exports = router;