import LoadingScene from "./scenes/LoadingScene";
import MainMenuUIScene from "./scenes/MainMenuUIScene";
import DunkShotGameScene from "./scenes/DunkShotGameScene";
import RestartUIScene from "./scenes/RestartUIScene";
import DunkShotGameUIScene from "./scenes/DunkShotGameUIScene";
import PauseUIScene from "./scenes/PauseUIScene";


class Game {
    constructor() {
        // Desired aspect ratio (width:height)
        const aspectRatio = 9 / 16;
        
        let gameWidth = 600, gameHeight = gameWidth / aspectRatio;

        // // Check if the device is a mobile phone
        // if (/Mobi|Android/i.test(navigator.userAgent)) {
        //     // For phones, use full screen
        //     gameHeight = window.innerHeight;
        //     gameWidth = window.innerWidth;
        // } else {
        //     // For computers, use max height and calculate width to maintain aspect ratio
        //     gameHeight = Math.min(window.innerHeight, 1800); // Example max height
        //     gameWidth = gameHeight * aspectRatio;
        // }

        // // Ensure the game does not exceed the window's width on computers
        // gameWidth = Math.min(gameWidth, window.innerWidth);

        const config = {
            type: Phaser.AUTO,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            scale: {
                mode: Phaser.Scale.FIT,
                width: gameWidth,
                height: gameHeight
            },
            scene: [LoadingScene, DunkShotGameScene, MainMenuUIScene, RestartUIScene, DunkShotGameUIScene, PauseUIScene],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    gravity: {x: 0, y: 1500 }
                }
            }
            
        };


        const game = new Phaser.Game(config);
    }

}

new Game()
