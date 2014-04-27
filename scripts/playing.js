globals.gameState.PLAYING = function (game) {
    this.layers = new Array();
    
    this.preload = function () {
        //Sherlock - added in temp holders for the initial coffin layer and further layers to be edited and commented in as progress happens.
        game.load.audio('hittingcoffin', 'sounds/hittingcoffin.wav');
        game.load.audio('diggingdirt', 'sounds/digindirt.wav');
        //game.load.image('layer0', 'images/Coffin.png');
        game.load.image('layer1', 'images/DirtProtoSmall.png');
        game.load.image('layer2', 'images/DirtProtoLarge.png');
        game.load.image('differential', 'images/layerdifferential.png');
        //game.load.image('layer3', 'images/DirtProtoSmall2.png');
        //game.load.image('layer4', 'images/DirtProtoSmall3.png');
        //game.load.image('layer5', 'images/DirtProtoSmall4.png');
        //game.load.image('layer6', 'images/DirtProtoSmall5.png');
        //game.load.image('layer7', 'images/MudProtoSmall.png');
        
        //Sherlock - added in some loaders for the stages of digging. commented out so they don't get in the way for the moment.
        //game.load.image('stage0', 'images/DigStage0.png'); //base stage, nothing has happened to the block/square/magical-obtuse-dragon-of-mythicology
        //game.load.image('stage1', 'images/DigStage1.png');
        //game.load.image('stage2', 'images/DigStage2.png');
        //game.load.image('stage3', 'images/DigStage3.png');
        //game.load.image('stage4', 'images/DigStage4.png');
        //game.load.image('stage5', 'images/DigStage5.png');
        game.load.image('mask', 'images/masklarge.png');
    };

    this.create = function () {
        //Sherlock - also added in temp holders here for the same purposes. Was wondering if we should edit the names to be 'Dirt1' and such for clarity later on?
        this.layers = [
            //new layer(game, 'layer0'),
            new layer(game, 'layer1'),
            new layer(game, 'layer2')
            //new layer(game, 'layer3'),
            //new layer(game, 'layer4'),
            //new layer(game, 'layer5'),
            //new layer(game, 'layer6'),
            //new layer(game, 'layer7')
        ];
        
        game.stage.backgroundColor = 0x880000;
        
        game.input.onDown.add(this.nextLayer, this);
        
        lowerLayer = this.layers[0];
        layer = this.layers[1];
        
        lowerLayer.draw();
        game.add.sprite(0,0,'differential'); // for clarity of which layer we are on
        layer.draw();
    };

    this.update = function () {
    };

    this.nextLayer = function () {
        temp = layer;
        layer = lowerLayer;
        lowerLayer = temp;
        
        lowerLayer.draw();
        game.add.sprite(0,0,'differential');
        layer.draw();
    };
    
    this.gridStatus = function () {
           
    }
};