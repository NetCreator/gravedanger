globals.gameState.PLAYING = function (game) {
    this.layers = new Array();
    
    this.nextLayer = 1;
    
    this.preload = function () {
        // Initialize Sounds
        game.load.audio('hittingcoffin', 'sounds/hittingcoffin.wav');
        game.load.audio('diggingdirt', 'sounds/digindirt.wav');
        
        // Inititalize Layers
        game.load.image('layer0', 'images/layers/coffintop1.png');
        game.load.image('layer1', 'images/layers/dirt1.png');
        game.load.image('layer2', 'images/layers/dirt2.png');
        game.load.image('layer3', 'images/layers/dirt3.png');
        game.load.image('layer4', 'images/layers/dirt4.png');
        game.load.image('layer5', 'images/layers/dirt5.png');
        game.load.image('differential', 'images/layerdifferential.png');
        
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
            new layer(game, 'layer0'),
            new layer(game, 'layer1'),
            new layer(game, 'layer2'),
            new layer(game, 'layer3'),
            new layer(game, 'layer4'),
            new layer(game, 'layer5'),
            //new layer(game, 'sky')
        ];
        
        game.stage.backgroundColor = 0x880000;
        
        this.lowerLayer = this.layers[0];
        this.layer = this.layers[1];
        
        game.input.onDown.add(this.redrawLayers, this);
        
        this.lowerLayer.draw();
        game.add.sprite(0,0,'differential'); // for clarity of which layer we are on
        this.layer.draw();
    };
    
    // Amount of holes it take to move onto a new layer as a percent
    this.moveAhead = 60
    
    this.update = function () {
    };

    this.nextLayer = function () {
        
        if(this.nextLayer == 6) {
            return; // ADD IN THE END OF GAME STUFFS >:(
        }
        
        temp = this.layer;
        this.layer = this.lowerLayer;
        this.lowerLayer = this.layer[nextLayer];
        this.nextLayer++;
        
        this.lowerLayer.draw();
        game.add.sprite(0,0,'differential');
        this.layer.draw();
    };
    
    this.redrawLayers = function () {
        this.layer.cellUpdateOnClick();
        
        this.lowerLayer.draw();
        game.add.sprite(0,0,'differential');
        this.layer.draw();
    };
    
    this.gridStatus = function() {
        if(Math.floor((this.layers.numHoles/(this.layers.logicGridStats.numRows*this.layers.logicGridStats.numColumns))*100) >= this.moveAhead) {
            this.nextLayer();
        }
        else {
            return;
        }
    }
};