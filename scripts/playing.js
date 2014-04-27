globals.gameState.PLAYING = function (game) {
    this.preload = function () {
        game.load.image('background', 'images/DirtProtoLarge.png');
        game.load.audio('hittingcoffin', 'sounds/hitingcoffin.wav');
        game.load.audio('diggingdirt', 'sounds/digindirt.wav');
    };

    this.create = function () {
        game.add.sprite(0,0,'background');
    };

    this.update = function () {
    };
};