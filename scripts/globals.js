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
<<<<<<< Updated upstream
    gameState :  {
        MAINMENU:  function (game) {},
        PLAYING:   function (game) {},
        GAMEOVER:  function (game) {}
=======
    gameState: {
        MAINMENU: function (game) {},
        PLAYING:  function (game) {},
        GAMEOVER: function (game) {}
>>>>>>> Stashed changes
    }
};

function layer(game, imgkey)
{
    this.sprite = new Phaser.Sprite(game, 0, 0, imgkey, 0);
}
