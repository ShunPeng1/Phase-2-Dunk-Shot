import IGoalPredicate from "./types/IGoalPredicate";

// Step 2: Implement Specific Goal Predicates
class ScoreToWinPredicate implements IGoalPredicate {
    private targetScore: number;
    private getCurrentScore: () => number;


    constructor(targetScore: number, getCurrentScore: () => number) {
        this.targetScore = targetScore;
        this.getCurrentScore = getCurrentScore;
    }

    public getGoalValue(): number {
        return this.targetScore;
    }

    public checkGoalAchieved(): boolean {
        return this.getCurrentScore() >= this.targetScore;
    }
}

export default ScoreToWinPredicate;