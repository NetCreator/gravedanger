globals.gameState.MAINMENU = function (game) {
    this.offsets = {
        startbutton : {
            x: 145,
            y: 290
        },
        titletext : {
            x: 125,
            y: 275
        }
    };

    this.preload = function () {
        // Load the background for the main menu
        game.load.image('menubackground', 'images/titlemenu/MenuLayout.png');
        game.load.image('startbutton', 'images/startbutton.png');
    };

    this.create = function () {
        // Render the background fo the main menu
        game.add.sprite(0, 0, 'menubackground');

        // Create a start button and render
        game.add.button(offsets.startbutton.x, offsets.startbutton.y, 'startbutton', startGame);

        // Create the title text and render it
        game.add.text(offsets.titletext.x, offsets.titletext.y, "Grave Danger");
    };

    this.update = function () {
    };
};