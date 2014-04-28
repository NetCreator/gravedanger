globals.gameState.GAMEOVER = function (game) {
    var offsets = {
        gameovertext: {
            x: 250,
            y: 200
        },
        replaybutton: {
            x: 300,
            y: 400
        }
    }
        
    this.preload = function () {
        game.load.image('gamewinbackground', 'images/gamewin.png');
        game.load.image('wintext', 'images/winnertext.png');
        game.load.image('replaybutton', 'images/replaybutton.png');
        game.load.audio('gameover', 'music/gameoverBGM.wav');
        game.load.audio('gameoverloop', 'music/gameoverloopBGM.wav');
    };

    this.create = function () {
        // Add and render the background for the gameover/win
        game.add.sprite(0, 0, 'gamewinbackground');
        
        // Add and render the gameover/win text. The height is constant, however the x-value should be 400-(imagesize.x/2) to ensure that the text is centered x-wise.
        game.add.sprite(offsets.gameovertext.x, offsets.gameovertext.y, 'wintext');
        
        // Add and render the replay button
        game.add.sprite(offsets.replaybutton.x, offsets.replaybutton.y, 'replaybutton');
        
        // Add the BGM
        this.gameovermusic = game.add.sound('gameover');
        this.gameovermusic.play();
        
        this.music.onStop.addOnce(this.loopAudio);

        game.add.button(offsets.replaybutton.x, offsets.replaybutton.y, 'replaybutton', this.replayGame);
    };
    
    this.loopAudio = funtion() {
        this.gameovermusic = new Phaser.Sound(game, 'gameoverloop');
        this.gameovermusic.play('', 0, 1, true);
    }

    this.update = function () {
    };
    
    this.replayGame = function() {
        game.state.start('MainMenu');
    }
};