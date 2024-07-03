import LoadingScene from "./scenes/LoadingScene";
import MainMenuUIScene from "./scenes/MainMenuUIScene";
import DunkShotGameScene from "./scenes/DunkShotGameScene";
import RestartUIScene from "./scenes/RestartUIScene";
import DunkShotGameUIScene from "./scenes/DunkShotGameUIScene";
import PauseUIScene from "./scenes/PauseUIScene";
import CustomizeState from "./managers/game-states/CustomizeState";
import CustomizeUIScene from "./scenes/CustomizeUIScene";
import ChallengeMenuScene from "./scenes/ChallengeMenuScene";


class Game {
    constructor() {
        // Desired aspect ratio (width:height)
        const aspectRatio = 9 / 16;
        
        let gameWidth = 600, gameHeight = gameWidth / aspectRatio;


        const config = {
            type: Phaser.AUTO,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            scale: {
                mode: Phaser.Scale.FIT,
                width: gameWidth,
                height: gameHeight
            },
            scene: [
                LoadingScene, 
                DunkShotGameScene, 
                MainMenuUIScene, 
                RestartUIScene, 
                DunkShotGameUIScene, 
                PauseUIScene, 
                CustomizeUIScene,
                ChallengeMenuScene
            ],
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
