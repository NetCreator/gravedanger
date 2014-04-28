globals.gameState.PLAYING = function (game) {
    this.preload = function () {
        game.load.image('background', 'images/DirtProtoLarge.png');
        game.load.audio('hittingcoffin', 'sounds/hitingcoffin.wav');
        game.load.audio('diggingdirt', 'sounds/digindirt.wav');

    };

    this.create = function () {
        game.add.sprite(0,0,'background');
    };

    this.nextLayer = function () {
        
        if(this.numNextLayer == 6) {
            this.game.state.start('gameover');
        }
        
        game.world.remove(this.layer.group);
        
        this.numNextLayer++;
        
        this.layer = this.lowerLayer;
        this.lowerLayer = this.layers[this.numNextLayer];
        
        this.lowerLayer.drawBackground();
        game.add.existing(this.differential);
        //this.differential.bringToTop();
        this.layer.draw();
        
        game.world.sort();
    };
    
    this.updateLayers = function () {
        this.layer.cellUpdateOnClick(this.layer);
        
        //this.lowerLayer.drawBackground();
        //game.add.existing(this.differential);
        //this.differential.bringToTop();
        //this.layer.draw();
        
        game.world.sort();
        
        this.gridStatus();
    };
    
    this.gridStatus = function() {
        this.playDirtSound();

        if(Math.floor(((this.layer.logicGridStats.numColumns*this.layer.logicGridStats.numRows)*5)/100) <= this.layer.numHoles) {
            this.nextLayer();
        }
        else {
            return;
        }
    }
    
    this.playDirtSound = function() {
        this.fx.play();
        return;
    }
};