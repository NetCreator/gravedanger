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
        game.load.audio('menuBGMintro', 'music/creepyintro.wav');
        game.load.audio('menuBGMloop', 'music/creepyloop.wav');
    };

    this.create = function () {
        // Render the background fo the main menu
        game.add.sprite(0, 0, 'menubackground');

        // Create a start button and render
        game.add.sprite(offsets.startbutton.x, offsets.startbutton.y, 'startbutton');
        
        // Check for a click to start the game
        game.input.onDown.addOnce(this.startGame);
        
        // Add BGM
        this.music = game.add.sound('menuBGMintro');
        this.music.play();
        
        this.music.onStop.addOnce(this.loopAudio);
    };

    this.loopAudio = function()
    {
        this.music = new Phaser.Sound(game, 'menuBGMloop');
        this.music.play('', 0, 1, true);
    };
    
    this.update = function () {
    };

    this.startGame = function () {
        game.state.start('Playing');
    };
};