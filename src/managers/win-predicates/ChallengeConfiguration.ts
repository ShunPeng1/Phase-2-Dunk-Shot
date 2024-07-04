class ChallengeConfiguration {
    winCondition: string;
    scoreToWin: number;

    constructor(configure: any) {
        this.winCondition = this.findPropertyValue(configure.properties, "WinCondition")!;
        let scoreToWinString = this.findPropertyValue(configure.properties, "ScoreToWin")!;
        this.scoreToWin = parseInt(scoreToWinString, 10);
        if (isNaN(this.scoreToWin)) {
            throw new Error("ScoreToWin must be a valid number");
        }
    }

    private findPropertyValue(properties: any[], propertyName: string): string | undefined {
        const property = properties.find(prop => prop.name === propertyName);
        return property ? property.value : undefined;
    }
}

export default ChallengeConfiguration;
