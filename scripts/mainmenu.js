globals.gameState.MAINMENU = function (game) {
    var offsets = {
        startbutton : {
            x: 210,
            y: 340
        }
    };

    this.preload = function () {
        // Load the background for the main menu
        game.load.image('menubackground', 'images/TitleMenu/MenuLayout.png');
        game.load.image('startbutton',    'images/TitleMenu/StartButton.png');
        game.load.audio('menuBGM', 'music/creepyloop.wav');
    };

    this.create = function () {
        // Render the background fo the main menu
        game.add.sprite(0, 0, 'menubackground');

        // Create a start button and render
        game.add.button(offsets.startbutton.x, offsets.startbutton.y, 'startbutton', this.startGame);
        
        // Add BGM
        music = game.add.audio('menuBGM', 1, true);
        music.play('', 0, 1, true);
    };

    this.update = function () {
    };

    this.startGame = function () {
        game.state.start('Playing');
    };
};