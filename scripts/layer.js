function layer(game, imgkey)
{
    this.game = game;
    
    /** Temp grid */
    this.grid = [[0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,0,0,0,0,0]];
    
    this.patches;
    
    this.sprite = new Phaser.Sprite(game, 0, 0, imgkey, 0);
    
    this.redraw = function () {
        this.draw();
    }
    
    this.draw = function () {
        this.patches = new Array(this.grid.length);
        for(var i = 0; i < this.patches.length; i++)
        {
            this.patches[i] = new Array(this.grid[0].length);
        }
        
        // Generate the dirt patch for each logical tile
        for(y = 0; y < this.grid.length; y++)
        {
            for(x = 0; x <= this.grid[y].length; x++)
            {
                if(this.grid[y][x] == 0)
                {
                    
                }
            }
        }
    }
}