globals.gameState.PLAYING = function (game) {
    this.preload = function () {
        game.load.image('background', 'phaser_tutorial_02/assets/sky.png');
    };

    this.create = function () {
        game.add.sprite(0,0,'background');
    };

    this.update = function () {
    };
};