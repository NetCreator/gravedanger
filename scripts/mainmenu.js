globals.gameState.MAINMENU = function (game) {
    var offsets = {
        startbutton : {
            x: 210,
            y: 340
        }
    };

    var music;

    this.preload = function () {
        // Load the background for the main menu
        this.load.image('menubackground', 'images/TitleMenu/MenuLayout.png');
        this.load.image('startbutton',    'images/TitleMenu/StartButton.png');
        this.load.audio('menuBGMintro',   'music/creepyintro.wav');
        game.load.audio('menuBGMloop',    'music/creepyloop.wav');
    };

    this.create = function () {
        // Render the background fo the main menu
        this.add.sprite(0, 0, 'menubackground');

        // Create a start button and render
        this.add.sprite(offsets.startbutton.x, offsets.startbutton.y, 'startbutton');

        // Check for a click to start the game
        this.input.onDown.addOnce(this.startGame);

        // Add BGM
        music = this.add.sound('menuBGMintro');
        music.play();

        music.onStop.addOnce(this.loopAudio);
    };

    this.loopAudio = function() {
        music = game.add.sound('menuBGMloop');
        music.play('', 0, 1, true);
    };

    this.update = function () {
    };

    this.startGame = function () {
        game.state.start('GameIntro');
    };
};