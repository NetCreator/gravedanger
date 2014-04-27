function layer(game, imgkey)
{
    this.game = game;
    
    // Size of the physical tile image
    this.actualTileSize = 64;
    
    // Size the game treats the tile as for purposes of rendering larger than a tile
    this.virtualTileSize = 50;
    
    this.mousePosition = {
        x: Math.floor(game.input.mousePointer.x/this.virtualTileSize)+1,
        y: Math.floor(game.input.mousePointer.y/this.virtualTileSize)+1,
    }
    
    // Final stage number for a cell
    this.finalStage = 5;
    
    // Dynamically determine the dimensions of the logic grid
    this.logicGridStats = {
        numRows: Math.floor(800/this.virtualTileSize),
        numColumns: Math.floor(600/this.virtualTileSize)
    };
    
    this.logicGrid = new Array(logicGridStats.numRows);
    
    // Logic grid creation
    for (var i = 0; i < logicGridStats.numRows; i++) {
        this.logicGrid[i] = new Array(logicGridStats.numColumns);
    }
    
    // Setting the numerical status for all stages to 0
    for (var x = 0; x < this.logicGridStats.numRows; x++) {
        for (var y = 0; y < this.logicGridStats.numColumns; y++) {
            logicGrid[x][y] = 0;
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
        
        // Generate the dirt patch for each logical tile
        for(y = 0; y < this.logicGrid.length; y++)
        {
            for(x = 0; x <= this.logicGrid[y].length; x++)
            {
                if(this.logicGrid[y][x] == 0)
                {
                    
                }
            }
        }
    }
    
    this.cellUpdateOnClick = function() { //Please change name to one that is equally understandable but easier to type TT-TT
        if (this.logicGrid[this.mousePosition.x][this.mousePosition.y] == this.finalStage) {
            return; // do nothing to the tile because nothing further can happen
        }
        else {
            this.logicGrid[this.mousePosition.x][this.mousePosition.y]++;
        }
    }
}