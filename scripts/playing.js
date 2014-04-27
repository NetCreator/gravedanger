globals.gameState.PLAYING = function (game) {
    var layers;
    
    var logicGridStats = {
        numRows: 100,
        numCollumns: 100
    };
    
    var logicGrid = new Array(logicGridStats.numRows);
    
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
        
        // Logic grid creation
        for (var i = 0; i < logicGridStats.numRows; i++) {
            logicGrid[i] = new Array(logicGridStats.numCollumns);
        }
    };

    this.update = function () {
    };

    this.nextLayer = function () {
        layer = nextLayer;
        nextLayer = null;
    };
};