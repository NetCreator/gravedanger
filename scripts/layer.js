function layer(game, imgkey)
{
    this.game = game;
    
    // Size of the physical tile image
    this.actualTileSize = 128;
    
    // Size the game treats the tile as for purposes of rendering larger than a tile
    this.virtualTileSize = 100;
    
    // Final stage number for a cell
    this.finalStage = 5;
    
    // Dynamically determine the dimensions of the logic grid
    this.logicGridStats = {
        numRows: Math.floor(800/this.virtualTileSize)+3,
        numColumns: Math.floor(600/this.virtualTileSize)+3
    };
    
    this.logicGrid = new Array(this.logicGridStats.numRows);
    
    // Logic grid creation
    for (var i = 0; i < this.logicGridStats.numRows; i++) {
        this.logicGrid[i] = new Array(this.logicGridStats.numColumns);
        
        // Setting the numerical status for all stages to 0
        for (var j = 0; j < this.logicGrid[i].length; j++)
        {
            this.logicGrid[i][j] = 0;
        }
    }
    
    this.patches;
    
    this.sprite = new Phaser.Sprite(game, 0, 0, imgkey, 0);
    
    this.redraw = function () {
        this.draw();
    }
    
    this.draw = function () {
        this.patches = new Array(this.logicGrid.length);
        for(var i = 0; i < this.patches.length; i++)
        {
            this.patches[i] = new Array(this.logicGrid[0].length);
        }
        
        var tilepatch;
        var alphapatch;
        
        // Generate the dirt patch for each logical tile
        for(var y = 0; y < this.logicGrid.length; y++)
        {
            for(var x = 0; x <= this.logicGrid[y].length; x++)
            {
                if(this.logicGrid[y][x] < this.finalStage)
                {   
                    // Create the bitmap data structure for storing the tile patch
                    tilepatch = game.add.bitmapData(
                        this.actualTileSize,
                        this.actualTileSize, 
                        '', false);
                    
                    // Copy the tile patch from the indicated source image
                    tilepatch.copyPixels(imgkey,
                        new Phaser.Rectangle(
                            (x-1)*this.virtualTileSize,
                            (y-1)*this.virtualTileSize,
                            this.actualTileSize,
                            this.actualTileSize
                        ),0,0);

                    // Create the bitmap data structure for storing the masked tile patch
                    alphapatch = game.add.bitmapData(this.actualTileSize, this.actualTileSize, 'alphapatch', true);
                    
                    // Mask the tile using the given mask
                    alphapatch.alphaMask(tilepatch.canvas, 'mask');
                    
                    // Add the masked spirte
                    this.patches[y][x] = game.add.sprite(
                        (x-1)*this.virtualTileSize - (this.actualTileSize - this.virtualTileSize)/2,
                        (y-1)*this.virtualTileSize - (this.actualTileSize - this.virtualTileSize)/2,
                        alphapatch);
                }
            }
        }
    }
    
    this.cellUpdateOnClick = function() { //Please change name to one that is equally understandable but easier to type TT-TT
        var temp = {x: game.input.mousePointer.x, y: game.input.mousePointer.y};
        
        var temp2 = {x: temp.x/100, y: temp.y/100};
        
        var temp3 = {x: Math.floor(temp2['x']), y: Math.floor(temp2.y)};
        
        var mousePosition = {
            x: Math.floor(game.input.mousePointer.x/100)+1,
            y: Math.floor(game.input.mousePointer.y/100)+1,
        }
        
        if (this.logicGrid[mousePosition.x][mousePosition.y] == this.finalStage) {
            return; // do nothing to the tile because nothing further can happen
        }
        else {
            this.logicGrid[mousePosition.x][mousePosition.y]++;
        }
    }
}