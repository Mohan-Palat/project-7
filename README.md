# project-2
# Project 2 - Video Game Inventory

## Overview

Over the years, I have collected and played video games from a variety of consoles, whether they are the newest titles or for free.  As a result, I have a fairly large collection which has become a bit of a challenge to maintain.  This app categorizes those games and consoles including details about the games, my experience playing them, and other features to enhance the gameplaying experience.

## User Stories
* As a user, I want to see a list of all systems so that I can understand what systems are owned.

* As a user, I want to select a system so that I can see a list of games associated with that system.

* As a user, I want to click on a game and see all of the details in order to better understand how the owner perceives the system.

* As a user, I want all lists sorted alphabetically by name for better readability.

* As a user, I want to be able to search for a game or console by name.

* As a user, I want to see which games are currently being played.

* As the owner, I want to keep any administrative activities like creating, editing, and deleting, hidden from the user so that they do not accidentally take those actions.

* As the owner, I want to be able to enter a password in order to perform administrative activities like creating, editing, and deleting.

* As the owner, I want to be able to create a new game and populate it with certain details so that it's in the collection.

* As the owner, I want to be able to create a new console and populate it with certain details so that it's in the collection.

* As the owner, I want to be prevented from adding an already existing game so that there are no duplicates.

* As the owner, I want to be able to edit the details of the game so that I can provide the most up to date information.

* As the owner, I want to be able to click a box in the game details to show that the game was recently played.

* As the owner, I want to be able to associate a game to a system so that it keeps an accurate list of games to the system.

* As the owner, I want to keep a list of games I currently play so that I know which ones I play often.

## Wireframe / Models
[Wireframe/model](project2-wireframe-model.pdf).

## Acknowledgements
[Useful for the search by name implementation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

[Case-insensitive sorting for list of games](https://stackoverflow.com/questions/22931177/case-insensitive-sorting-in-mongodb)

## Future Enhancements
* Model for accessories on both consoles and games
* Button to clear out text from input fields (did attempt this but preventDefault() did not work as expected)
* Media gallery which includes scrolling through multiple images and/or videos while on the same page
* Ability to add description and/or comments, similar to blog style
* Model for multiple users to add comments or other media
* Check for duplicate games on the same console (some games can have versions on different consoles).
* Additional search options