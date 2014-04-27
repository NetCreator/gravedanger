globals.gameState.PLAYING = function (game) {
    this.preload = function () {
        game.load.image('background', 'images/DirtProtoLarge.png');
    };

    this.create = function () {
        game.add.sprite(0,0,'background');
    };

    this.update = function () {
    };
};