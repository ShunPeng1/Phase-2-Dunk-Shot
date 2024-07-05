import Ball from "../balls/Ball";
import ScoreCounter from "./ScoreCounter";

class ScorePopupText {

    private scene: Phaser.Scene;
    private ball: Ball;
    private scoreCounter: ScoreCounter;

    constructor(scene: Phaser.Scene, ball: Ball, scoreCounter: ScoreCounter) {

        this.scene = scene;
        this.ball = ball;
        this.scoreCounter = scoreCounter;

        scoreCounter.on(scoreCounter.SCORE_UPDATE_EVENT, this.showScorePopupText, this);
    }
    
    private showScorePopupText(totalScore: number, addScore: number, prefectCount: number, bounceCount: number): void {
        // Position for the popup texts, assuming they should appear above the ball
        //console.log("showScorePopupText");
        
        const position = { x: this.ball.x, y: this.ball.y - 50 };
    
        // Common style for texts
        const textStyle = { 
            fontSize: '32px', 
            color: '#dc4f24', 
            fontFamily: 'Arial', 
            fontStyle: 'bold',
            align: 'center'
        };

    
        // Add Score Text
        if (addScore > 0) {
            let addScoreText = this.scene.add.text(position.x, position.y, `+${addScore}`, textStyle).setOrigin(0.5);
            this.animateText(addScoreText);
        }
    
        // Adjust color for bounce and prefect texts
        textStyle.color = '#0000ff'; // Bounce Count Text Color
        let delay = 300;
        let height = 50
    
        // Bounce Count Text
        if (bounceCount > 0) {
            let bounceTextMessage = "Bounce " + (bounceCount > 1 ? `x${bounceCount}` : '');
            let bounceText = this.scene.add.text(position.x, position.y - height, bounceTextMessage, textStyle).setOrigin(0.5);
            this.animateText(bounceText, delay); // Delay this animation to start after the addScoreText
       
            delay += 300;
            height += 50;
        }
    
        textStyle.color = '#ff8b00'; // Prefect Count Text Color
    
        // Prefect Count Text
        if (prefectCount > 0) {
            let prefectTextMessage = "Perfect " + (prefectCount > 1 ? `x${prefectCount}` : '');
            let prefectText = this.scene.add.text(position.x, position.y - height, prefectTextMessage, textStyle).setOrigin(0.5);
            this.animateText(prefectText, delay); // Further delay this animation
        }
    }
    
    private animateText(text: Phaser.GameObjects.Text, delay: number = 0): void {
        text.setAlpha(0);
        this.scene.tweens.add({
            targets: text,
            y: text.y - 50,
            alpha: 0,
            delay: delay,
            duration: 1000,
            onComplete: () => text.destroy(),
            onStart: () => text.setAlpha(1)
        });
    }

}

export default ScorePopupText;