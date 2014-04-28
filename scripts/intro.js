globals.gameState.INTRO = function (game) {
    /**
     * This is the list of flavor texts used during the intro.
     * @type {Array}
     */
    var flavortext = {
        key:         ['text1', 'text2', 'text3', 'text4', 'text5', 'text6', 'text7', 'text8'],
        offsetX:     [422/2, 486/2, 262/2, 120/2, 112/2, 326/2, 174/2, 234/2],
        fadeInTime:  [4, 5, 4, 3, 3, 6, 4, 3],
        fadeOutTime: [2, 2, 2, 2, 2, 2, 2, 4]
    };

    var textOffset = {
        x: 400,
        y: 200
    }

    this.preload = function () {
        this.load.image('black', 'images/Intro/black.png');
        this.load.image('sight', 'images/layers/coffintop1.png');
        this.load.image('text1', 'images/Intro/text1.png');
        this.load.image('text2', 'images/Intro/text2.png');
        this.load.image('text3', 'images/Intro/text3.png');
        this.load.image('text4', 'images/Intro/text4.png');
        this.load.image('text5', 'images/Intro/text5.png');
        this.load.image('text6', 'images/Intro/text6.png');
        this.load.image('text7', 'images/Intro/text7.png');
        this.load.image('text8', 'images/Intro/text8.png');
    };

    this.create = function () {
        this.bgGroup = this.add.group();
        this.bgGroup.create(0, 0, 'black');

        this.textGroup = this.add.group();
        this.textGroup.alpha = 0;
        this.nextText = -1;

        this.fadeInText();
    };

    this.update = function () {
    };

    this.fadeInText = function () {
        if (this.nextText >= flavortext.key.length) {
            this.introComplete();
        }

        this.textGroup.remove(this.curtext, true);
        this.curtext = this.textGroup.create(textOffset.x - flavortext.offsetX[++this.nextText], textOffset.y, flavortext.key[this.nextText]);

        var tween = this.add.tween(this.textGroup);
        tween.to({alpha: 1}, flavortext.fadeInTime[this.nextText] * 1000);
        tween.onComplete.add(this.fadeOutText, this);
        tween.start();
    }

    this.fadeOutText = function () {
        var tween = this.add.tween(this.textGroup);
        tween.to({alpha: 0}, flavortext.fadeOutTime[this.nextText] * 1000);
        tween.onComplete.add(this.fadeInText, this);
        tween.start();
    }

    this.introComplete = function () {
        game.state.start('Playing');
    }
};