function layer(game, imgkey, layernumber)
{
    this.game = game;

    // Size of the physical tile image
    this.actualTileSize = 128;

    // Size the game treats the tile as for purposes of rendering larger than a tile
    this.virtualTileSize = 100;

    // Final stage number for a cell
    this.finalStage = 5;
    
    // Number of holes created
    this.numHoles = 0;
    
    // Dynamically determine the dimensions of the logic grid
    this.logicGridStats = {
        numColumns: Math.floor(800/this.virtualTileSize)+3,
        numRows: Math.floor(600/this.virtualTileSize)+3
    };

    // The grid for storing digging progress
    this.logicGrid = new Array(this.logicGridStats.numColumns);
    
    // Stores sprites for each digging patch
    this.patches = new Array(this.logicGrid.length);
    
    // The aggregate sprite containing the entire layer image (used for background)
    this.sprite = new Phaser.Sprite(game, 0, 0, imgkey, 0);
    
    // The group to contain all layer graphics
    this.group = game.add.group(game.world, 'layer-' + layernumber);
    this.group.setProperty('z', layernumber); // Set the z order according to the layer number
    //this.group.z = layernumber; 
    
    // Temporary variables for creating patch sprites
    var tilepatch;
    var alphapatch;
    
    // Logic grid creation
    for (var x = 0; x < this.logicGridStats.numColumns; x++) {
        this.logicGrid[x] = new Array(this.logicGridStats.numRows);
        this.patches[x] = new Array(this.logicGrid[x].length);

        // Initialize the digging progress and the patch sprites
        for (var y = 0; y < this.logicGrid[x].length; y++)
        {
            // Initialize the digging progress to 0
            this.logicGrid[x][y] = 0;
            
            // Create the bitmap data structure for storing the tile patch
            tilepatch = game.add.bitmapData(
                this.actualTileSize,
                this.actualTileSize,
                '', false);

            // Copy the tile patch from the indicated source image
            tilepatch.copyPixels(imgkey,
                new Phaser.Rectangle(
                    (x)*this.virtualTileSize,
                    (y)*this.virtualTileSize,
                    this.actualTileSize,
                    this.actualTileSize
                ),0,0);

            // Create the bitmap data structure for storing the masked tile patch
            alphapatch = game.add.bitmapData(this.actualTileSize, this.actualTileSize, 'alphapatch', true);

            // Mask the tile using the given mask
            alphapatch.alphaMask(tilepatch.canvas, 'mask');
            
            // Create the patch
            this.patches[x][y] = new Phaser.Sprite(
                game,
                (x-1)*this.virtualTileSize - (this.actualTileSize - this.virtualTileSize)/2,
                (y-1)*this.virtualTileSize - (this.actualTileSize - this.virtualTileSize)/2,
                alphapatch);
        }
    }

    this.redraw = function () {
        this.draw();
    };

    this.draw = function () {
        // Generate the dirt patch for each logical tile
        for(var x = 0; x < this.logicGrid.length; x++)
        {
            for(var y = 0; y <= this.logicGrid[x].length; y++)
            {
                if(this.logicGrid[x][y] < this.finalStage)
                {   
                    this.group.add(this.patches[x][y]);
                    //this.patches[x][y].bringToTop;
                }
                else
                {
                    this.group.remove(this.patches[x][y], true);
                }
            }
        }
        
        game.add.existing(this.group);
    };
    
    this.drawBackground = function () {
        this.group.add(this.sprite);
        //this.sprite.bringToTop();
    };

    this.cellUpdateOnClick = function () { //Please change name to one that is equally understandable but easier to type TT-TT
        var temp = {x: game.input.mousePointer.x, y: game.input.mousePointer.y};

        var temp2 = {x: temp.x/this.virtualTileSize, y: temp.y/this.virtualTileSize};

        var temp3 = {x: Math.floor(temp2.x), y: Math.floor(temp2.y)};

        console.log(this.logicGrid[temp3.x+1][temp3.y +1]);

        var mousePosition = {
            x: Math.floor(game.input.mousePointer.x/this.virtualTileSize)+1,
            y: Math.floor(game.input.mousePointer.y/this.virtualTileSize)+1,
        }

        if (this.logicGrid[mousePosition.x][mousePosition.y] == this.finalStage) {
            return; // do nothing to the tile because nothing further can happen
        }
        else {
            this.logicGrid[mousePosition.x][mousePosition.y]++;
            if(this.logicGrid[mousePosition.x][mousePosition.y] == this.finalStage) {
                this.numHoles++;
            }
        }
    };
}