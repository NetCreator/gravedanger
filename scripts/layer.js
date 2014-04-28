function layer(game, imgkey, bgimgkey, layernumber)
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
    this.bgsprite = new Phaser.Sprite(game, 0, 0, bgimgkey, 0);

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
        this.group.remove(this.bgsprite);
        // Generate the dirt patch for each logical tile
        for(var x = 0; x < this.logicGrid.length; x++)
        {
            for(var y = 0; y <= this.logicGrid[x].length; y++)
            {
                if(this.logicGrid[x][y] < this.finalStage)
                {
                    this.group.add(this.patches[x][y]);
                }
            }
        }

        game.add.existing(this.group);
    };

    this.drawBackground = function () {
        this.group.add(this.bgsprite);
    };

    this.updateCell = function (that) {
        var mousePosition = {
            x: Math.floor(game.input.mousePointer.x/that.virtualTileSize)+1,
            y: Math.floor(game.input.mousePointer.y/that.virtualTileSize)+1,
        }

        console.log(that.logicGrid[mousePosition.x][mousePosition.y]);

        if (that.logicGrid[mousePosition.x][mousePosition.y] == that.finalStage) {
            return; // do nothing to the tile because nothing further can happen
        } else {
            that.logicGrid[mousePosition.x][mousePosition.y]++;
            if(that.logicGrid[mousePosition.x][mousePosition.y] == that.finalStage) {
                that.numHoles++;
                that.group.remove(that.patches[mousePosition.x][mousePosition.y]);
            }
        }
    };
}