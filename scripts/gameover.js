globals.gameState.GAMEOVER = function (game) {
    var offsets = {
        gameovertext: {
            x: 400 - (322/2),
            y: 200
        },
        replaybutton: {
            x: 400 - (244/2),
            y: 400
        }
    };
    
    var gameovermusic;
        
    this.preload = function () {
        this.load.image('gamewinbackground', 'images/layers/skybox.png');
        this.load.image('wintext',           'images/gamecomplete.png');
        this.load.image('replaybutton',      'images/replay.png');
        this.load.audio('gameover',          'music/spookyintro.wav');
        game.load.audio('gameoverloop',      'music/spookyloop.wav');
    };

    this.create = function () {
        // Add and render the background for the gameover/win
        this.add.sprite(0, 0, 'gamewinbackground');
        
        // Add and render the gameover/win text. The height is constant, however the x-value should be 400-(imagesize.x/2) to ensure that the text is centered x-wise.
        this.add.sprite(offsets.gameovertext.x, offsets.gameovertext.y, 'wintext');
        
        // Add and render the replay button
        this.add.sprite(offsets.replaybutton.x, offsets.replaybutton.y, 'replaybutton');
        
        // Check for a click to start the game
        this.input.onDown.addOnce(this.replayGame);
        
        // Add the BGM
        game.sound.pauseAll();
        gameovermusic = this.add.sound('gameover');
        gameovermusic.play();
        
        gameovermusic.onStop.addOnce(this.loopAudio);
    };
    
    this.loopAudio = function() {
        gameovermusic = game.add.sound('gameoverloop');
        gameovermusic.play('', 0, 1, true);
    };

    this.update = function () {
    };
    
    this.replayGame = function() {
        game.state.start('MainMenu');
    };
};