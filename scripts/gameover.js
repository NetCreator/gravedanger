globals.gameState.GAMEOVER = function (game) {
    this.preload = function () {
        game.load.image('gamewin', 'images/gamewin.png');
        game.load.image('wintext', 'images/winnertext.png');
        game.load.audio('gameover', 'music/gameoverBGM.wav');
    };

    this.create = function () {
    };

    this.update = function () {
    };
};