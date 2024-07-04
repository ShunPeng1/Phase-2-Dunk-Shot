class ChallengeGameStateManager {
    private themeColor : number;

    private currentGameState : string;

    constructor() {
        this.themeColor = 0x000000;
        this.currentGameState = '';
    }

    public setThemeColor(color : number) : void {
        this.themeColor = color;
    }

    public getThemeColor() : number {
        return this.themeColor;
    }

}


export default ChallengeGameStateManager;