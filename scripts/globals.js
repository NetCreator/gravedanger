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
