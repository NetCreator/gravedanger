globals.gameState.PLAYING = function (game) {
    this.layers = new Array();
    
    this.numNextLayer = 1;
    
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
            new layer(game, 'layer0', 0),
            new layer(game, 'layer1', 1),
            new layer(game, 'layer2', 2),
            new layer(game, 'layer3', 3),
            new layer(game, 'layer4', 4),
            new layer(game, 'layer5', 5),
            //new layer(game, 'sky', 6)
        ];
        
        this.fx = game.add.audio('diggingdirt', 1, false);
            
        game.stage.backgroundColor = 0x880000;
        
        this.lowerLayer = this.layers[0];
        this.layer = this.layers[1];
        
        this.differential = new Phaser.Sprite(game, 0,0, 'differential')
        
        game.input.onDown.add(this.redrawLayers, this);
        
        this.lowerLayer.drawBackground();
        game.add.existing(this.differential); // for clarity of which layer we are on
        //this.differential.bringToTop();
        this.layer.draw();
        
        game.world.sort();
    };
    
    // Amount of holes it take to move onto a new layer as a percent
    this.moveAhead = 60
    
    this.update = function () {
    };

    this.nextLayer = function () {
        
        if(this.numNextLayer == 6) {
            return; // ADD IN THE END OF GAME STUFFS >:(
        }
        
        this.layer = this.lowerLayer;
        this.lowerLayer = this.layer[this.numNextLayer];
        this.numNextLayer++;
        
        this.lowerLayer.drawBackground();
        game.add.existing(this.differential);
        //this.differential.bringToTop();
        this.layer.draw();
        
        game.world.sort();
    };
    
    this.redrawLayers = function () {
        this.layer.cellUpdateOnClick();
        
        this.lowerLayer.drawBackground();
        game.add.existing(this.differential);
        //this.differential.bringToTop();
        this.layer.draw();
        
        game.world.sort();
        
        this.gridStatus();
    };
    
    this.gridStatus = function() {
        this.fx.play();
        if(Math.floor(((this.layer.logicGridStats.numColumns*this.layer.logicGridStats.numRows)*60)/100) >= this.moveAhead) {
            this.nextLayer();
        }
        else {
            return;
        }
    }
};