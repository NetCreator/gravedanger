/**
 * @fileOverview Our global constants and definitions.
 * @author Texnical, LeyarotheConqueror, AlejandorLazaro
 * @version 0.1a
 */

/** @namespace  */
var globals = {
    /**
     * These are the game states our game may operate in.
     */
    var offsets = function() {
        var startbutton = {
            x: 145,
            y: 290
        };

        var titletext = {
            x: 125,
            y: 275
        };
    }

    gameState :  {
        MAINMENU : function (game) {
            this.preload = function () {
                // Load the background for the main menu
                game.load.image('menubackground', 'images/something.png');
                game.load.image('startbutton', 'images/startbutton.png');
            },

            this.create = function () {
                // Render the background fo the main menu
                game.add.sprite(0, 0, 'menubackground');

                // Create a start button and render
                game.add.button(startbuttonPosition.x, startbuttonPosition.y, 'startbutton', startGame);

                // Create the title text and render it
                game.add.text(titlePosition.x, titlePosition.y, "Grave Danger")
            },

            this.update = function () {
            }
        },
        PLAYING: function (game) {
            this.preload = function () {
            },

            this.create = function () {
            },

            this.update = function () {
            }
        },
        GAMEOVER: function (game) {
            this.preload = function () {
            },

            this.create = function () {
            },

            this.update = function () {
            }
        }
    }
};
