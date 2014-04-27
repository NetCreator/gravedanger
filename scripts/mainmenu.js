globals.gameState.MAINMENU = function (game) {
    var offsets = {
        startbutton : {
            x: 249,
            y: 255
        },
        titletext : {
            x: 68,
            y: 188
        }
    };

    this.preload = function () {
        // Load the background for the main menu
        game.load.image('menubackground', 'images/TitleMenu/MenuLayout.png');
        game.load.image('startbutton', 'images/TitleMenu/StartButton.png');
        game.load.image('title', 'images/TitleMenu/TitleText.png');
    };

    this.create = function () {
        // Render the background fo the main menu
        game.add.sprite(0, 0, 'menubackground');

        // Create a start button and render
        game.add.button(offsets.startbutton.x, offsets.startbutton.y, 'startbutton', this.startGame);

        // Create the title text and render it
        game.add.sprite(offsets.titletext.x, offsets.titletext.y, 'title');
    };

    this.update = function () {
    };

    this.startGame = function () {
        game.state.start('Playing');
    };
};