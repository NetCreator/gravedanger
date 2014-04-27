function layer(game, imgkey)
{
    this.game = game;
    
    var logicGridStats = {
        numRows: 100,
        numColumns: 100
    };
    
    /** Temp grid */
    var logicGrid = new Array(logicGridStats.numRows);
    
    // Logic grid creation
    for (var i = 0; i < logicGridStats.numRows; i++) {
        logicGrid[i] = new Array(logicGridStats.numColumns);
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
                if(this.grid[y][x] == 0)
                {
                    
                }
            }
        }
    }
}