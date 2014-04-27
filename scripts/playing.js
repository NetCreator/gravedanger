globals.gameState.PLAYING = function (game) {
    var layers;

    this.preload = function () {
        game.load.audio('hittingcoffin', 'sounds/hitingcoffin.wav');
        game.load.audio('diggingdirt', 'sounds/digindirt.wav');
        game.load.image('layer1', 'images/TempDirt.png');
        game.load.image('layer2', 'images/DirtProtoSmall.png');
    };

    this.create = function () {
        layers = [
            new layer(game, 'layer1'),
            new layer(game, 'layer2')
        ];

        nextLayer = game.add.existing(layers[1].sprite);
        layer = game.add.existing(layers[0].sprite);
        game.input.onDown.add(this.nextLayer, this);
    };

    this.update = function () {
    };

    this.nextLayer = function () {
        layer = nextLayer;
        enxtLayer = null;
    };
};