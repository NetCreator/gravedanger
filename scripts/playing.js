globals.gameState.PLAYING = function (game) {
    var layers;
    
    var logicGridStats = {
        numRows: 100,
        numColumns: 100
    };
    
    var logicGrid = new Array(logicGridStats.numRows);
    
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

        lowerLayer = game.add.existing(layers[1].sprite);
        layer = game.add.existing(layers[0].sprite);

        game.input.onDown.add(this.nextLayer, this);
        
        // Logic grid creation
        for (var i = 0; i < logicGridStats.numRows; i++) {
            logicGrid[i] = new Array(logicGridStats.numColumns);
        }
        
        game.input.onDown.add(this.nextLayerCow, this);
    };

    this.update = function () {
    };


    this.nextLayer = function () {
        temp = layer;
        layer = lowerLayer;
        lowerLayer = temp;
        layer.parent.moveUp(layer);
        layer.update();
        lowerLayer.update();
    };
};