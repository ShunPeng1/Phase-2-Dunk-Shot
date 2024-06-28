class ScoreCounter {
    private _score: number = 0;

    get score(): number {
        return this._score;
    }

    increment(): void {
        this._score++;
    }

    reset(): void {
        this._score = 0;
    }
}


export default ScoreCounter;