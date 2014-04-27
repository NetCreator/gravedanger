function layer(game, imgkey)
{
    this.game = game;
    
    this.sprite = new Phaser.Sprite(game, 0, 0, imgkey, 0);
}