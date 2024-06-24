import Test from "./Test";

class Game {
    constructor() {
        // Desired aspect ratio (width:height)
        const aspectRatio = 3 / 4;
        
        let gameWidth, gameHeight;

        // Check if the device is a mobile phone
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            // For phones, use full screen
            gameHeight = window.innerHeight;
            gameWidth = window.innerWidth;
        } else {
            // For computers, use max height and calculate width to maintain aspect ratio
            gameHeight = Math.min(window.innerHeight, 1800); // Example max height
            gameWidth = gameHeight * aspectRatio;
        }

        // Ensure the game does not exceed the window's width on computers
        gameWidth = Math.min(gameWidth, window.innerWidth);

        const config = {
            type: Phaser.AUTO,
            width: gameWidth,
            height: gameHeight,
            scene: Test,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {x: 0, y: 0 }
                }
            }
        };


        const game = new Phaser.Game(config);
    }

}

new Game()
