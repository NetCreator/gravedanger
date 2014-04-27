globals.gameState.MAINMENU = function (game) {
    this.preload = function () {
        // Load the background for the main menu
        game.load.image('menubackground', 'images/TitleMenu/MenuLayout.png');
        game.load.image('startbutton', 'images/TitleMenu/StartButton.png');
    };

    this.create = function () {
        // Render the background fo the main menu
        game.add.sprite(0, 0, 'menubackground');

        // Create a start button and render
        game.add.button(startbuttonPosition.x, startbuttonPosition.y, 'startbutton', startGame);

        // Create the title text and render it
        game.add.text(titlePosition.x, titlePosition.y, "Grave Danger");
    };

    this.update = function () {
    };
};