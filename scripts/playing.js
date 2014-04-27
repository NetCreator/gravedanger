globals.gameState.PLAYING = function (game) {
    this.layers = new Array();
    
    this.preload = function () {
        //Sherlock - added in temp holders for the initial coffin layer and further layers to be edited and commented in as progress happens.
        game.load.audio('hittingcoffin', 'sounds/hittingcoffin.wav');
        game.load.audio('diggingdirt', 'sounds/digindirt.wav');
        //game.load.image('layer0', 'images/Coffin.png');
        game.load.image('layer1', 'images/TempDirt.png');
        game.load.image('layer2', 'images/DirtProtoSmall.png');
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
        game.load.image('mask', 'images/mask.png');
    };

    this.create = function () {
        //Sherlock - also added in temp holders here for the same purposes. Was wondering if we should edit the names to be 'Dirt1' and such for clarity later on?
        //there also seems to be a problem with syntax, I think we need to define 'layer' as an object, possibly in a new file for space.
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
        //nextLayer = game.add.existing(layers[1].sprite);
        //layer = game.add.existing(layers[0].sprite);
        
        game.input.onDown.add(this.nextLayer, this);
        
        var layer2 = new Phaser.Sprite(game, 0,0,'layer1',0);
        
        var tilemask = game.add.bitmapData(800,600, 'tilemask', true);
        tilemask.draw('mask', 0, 0);
        
        var tilepatch = game.add.bitmapData(800,600, 'tilepatch', true);
        tilepatch.copyPixels('layer2', new Phaser.Rectangle(0,0,64,64),0,0);
        
        var alphapatch = game.add.bitmapData(64, 64, 'alphapatch', true);
        alphapatch.alphaMask(tilepatch.canvas, 'mask');
        
        game.add.sprite(0,0, tilemask);
        game.add.sprite(64,0,tilepatch);
        game.add.sprite(128,0,alphapatch);
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
    
    this.gridStatus = function () {
           
    }
};