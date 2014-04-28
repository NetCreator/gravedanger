globals.gameState.INTRO = function (game) {
    this.preload = function () {
        this.load.image('black', 'images/Intro/black.png');
    };

    this.create = function () {
        this.add.sprite(0, 0, 'black');

        var flavortext = [
            "You open your eyes. The world is black around you.",
            "Your eyes slowly begin to adjust to the light around you.",
            "You have been buried in a grave.",
            "You are dead...",
            "Or are you?",
            "Your lungs begin tightening..\nYou are running out of air and choking!",
            "Dig out of the grave!"
        ];

        for (int i = 0; i < flavortext.length; i++) {
            ...
        };

        this.introComplete();
    };

    this.update = function () {
    };

    this.introComplete = function() {
        game.state.start('Playing');
    }
};