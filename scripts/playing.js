globals.gameState.PLAYING = function (game) {
    this.layers = new Array();

    this.numNextLayer = 1;

    var flavortext = {
        key:         ['text7', 'text8'],
        offsetX:     [174/2, 234/2],
        fadeInTime:  [5, 3],
        fadeOutTime: [2, 4]
    };
    
    var textOffset = {
        x: 400,
        y: 200
    };

    this.preload = function () {
        // Initialize Sounds
        game.load.audio('hittingcoffin', 'sounds/hittingcoffin.wav');
        game.load.audio('diggingdirt', 'sounds/digindirt.wav');

        // Inititalize Layers
        game.load.image('coffin', 'images/layers/coffintop2.png');
        game.load.image('dirt1', 'images/layers/dirt1.png');
        game.load.image('dirt1bg', 'images/layers/dirt1background.png');
        game.load.image('dirt2', 'images/layers/dirt2.png');
        game.load.image('dirt2bg', 'images/layers/dirt2background.png');
        game.load.image('dirt3', 'images/layers/dirt3.png');
        game.load.image('dirt3bg', 'images/layers/dirt3background.png');
        game.load.image('dirt4', 'images/layers/dirt4.png');
        game.load.image('dirt4bg', 'images/layers/dirt4background.png');
        game.load.image('dirt5', 'images/layers/dirt5.png');
        game.load.image('dirt5bg', 'images/layers/dirt5background.png');
        game.load.image('sky', 'images/layers/skybox.png');

        // Load game text
        this.load.image('text7', 'images/Intro/text7.png');
        this.load.image('text8', 'images/Intro/text8.png');

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
        this.layers = [
            new layer(game, 'coffin', 'coffin', 0),
            new layer(game, 'dirt1', 'dirt1bg', 1),
            new layer(game, 'dirt2', 'dirt2bg', 2),
            new layer(game, 'dirt3', 'dirt3bg', 3),
            new layer(game, 'dirt4', 'dirt4bg', 4),
            new layer(game, 'dirt5', 'dirt5bg', 5),
            new layer(game, 'sky', 'sky', 6)
        ];

        this.fx = game.add.audio('diggingdirt', 1, false);

        game.stage.backgroundColor = 0x880000;

        this.lowerLayer = this.layers[1];
        this.layer = this.layers[0];

        this.differential = new Phaser.Sprite(game, 0,0, 'differential');

        game.input.onDown.add(this.updateLayers, this);

        this.lowerLayer.drawBackground();
        //game.add.existing(this.differential); // for clarity of which layer we are on
        //this.differential.bringToTop();
        this.layer.draw();

        this.textGroup = this.add.group();
        this.textGroup.alpha = 0;
        this.textGroup.z = 100;
        this.nextText = -1;
        
        this.fadeInText();
        
        game.world.sort();
    };

    // Amount of holes it take to move onto a new layer as a percent
    this.moveAhead = 60;

    this.update = function () {
    };

    this.nextLayer = function () {
        if(this.numNextLayer == this.layers.length + 1) {
            return; // ADD IN THE END OF GAME STUFFS >:(
        }

        game.world.remove(this.layer.group);

        this.numNextLayer++;

        this.layer = this.lowerLayer;
        this.lowerLayer = this.layers[this.numNextLayer];

        this.lowerLayer.drawBackground();
        //game.add.existing(this.differential);
        this.layer.draw();

        game.world.sort();
    };

    this.updateLayers = function () {
        this.layer.updateCell(this.layer);

        game.world.sort();

        this.gridStatus();
    };

    this.gridStatus = function() {
        this.playDirtSound();
        if(this.layer.numHoles >= Math.floor((((this.layer.logicGridStats.numColumns-3)*(this.layer.logicGridStats.numRows-3))*0.3))) {
            this.nextLayer();
        }
        else {
            return;
        }
    };

    this.playDirtSound = function() {
        this.fx.play();
        return;
    };

    this.fadeInText = function () {
        if (this.nextText >= flavortext.key.length) {
            return;
        }

        this.textGroup.remove(this.curtext, true);
        this.curtext = this.textGroup.create(textOffset.x - flavortext.offsetX[++this.nextText], textOffset.y, flavortext.key[this.nextText]);

        var tween = this.add.tween(this.textGroup);
        tween.to({alpha: 1}, flavortext.fadeInTime[this.nextText] * 1000);
        tween.onComplete.add(this.fadeOutText, this);
        tween.start();
    };

    this.fadeOutText = function () {
        var tween = this.add.tween(this.textGroup);
        tween.to({alpha: 0}, flavortext.fadeOutTime[this.nextText] * 1000);
        tween.onComplete.add(this.fadeInText, this);
        tween.start();
    };
};