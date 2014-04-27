globals.gameState.PLAYING = function (game) {
    var layers;

    this.preload = function () {
        game.load.audio('hittingcoffin', 'sounds/hittingcoffin.wav');
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
        game.input.onDown.add(this.nextLayerCow, this);
    };

    this.update = function () {
    };

    this.nextLayerCow = function () {
    };
};