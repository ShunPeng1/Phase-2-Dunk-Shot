import IGoalPredicate from "./types/IGoalPredicate"

class ChallengeConfiguration {
    public readonly winCondition: string
    public readonly scoreToWin: number

    private goalPredicate : IGoalPredicate

    
    constructor(configure: any) {
        const winCondition = this.findPropertyValue(configure.properties, "WinCondition");
        if (winCondition === undefined) {
            throw new Error("WinCondition property not found");
        }
        this.winCondition = winCondition;
        const scoreToWinString = this.findPropertyValue(configure.properties, "ScoreToWin");
        if (scoreToWinString === undefined) {
            throw new Error("ScoreToWin property not found");
        }
        this.scoreToWin = parseInt(scoreToWinString, 10)
        if (isNaN(this.scoreToWin)) {
            throw new Error("ScoreToWin must be a valid number")
        }
    }

    public setGoalPredicate(predicate : IGoalPredicate) {
        this.goalPredicate = predicate
    }

    public getGoalPredicate() : IGoalPredicate {
        return this.goalPredicate
    }

    private findPropertyValue(properties: any[], propertyName: string): string | undefined {
        const property = properties.find(prop => prop.name === propertyName)
        return property ? property.value : undefined
    }
}

export default ChallengeConfiguration
