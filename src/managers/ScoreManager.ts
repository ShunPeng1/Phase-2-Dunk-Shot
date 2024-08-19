class ScoreManager {
    
    private static instance: ScoreManager
    private score: number
    private highScore: number
    private scoreSubscribers: ((score: number) => void)[] = []
    private highScoreSubscribers: ((highScore: number) => void)[] = []

    private constructor() {
        this.score = 0
        this.loadHighScore()
    }

    public static getInstance(): ScoreManager {
        if (!ScoreManager.instance) {
            ScoreManager.instance = new ScoreManager()
        }
        return ScoreManager.instance
    }

    public addScore(score: number) {
        this.score += score
        this.notifyScoreSubscribers()
    }

    public resetScore() {
        this.score = 0
        this.notifyScoreSubscribers()
    }
    
    public setScore(score: number) {
        this.score = score
        this.notifyScoreSubscribers()
    }

    public getScore(){
        return this.score
    }

    public saveHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score
            localStorage.setItem('highScore', this.highScore.toString())
            this.notifyHighScoreSubscribers()
        }
    }


    public loadHighScore() {
        const highScore = localStorage.getItem('highScore')
        if (highScore) {
            this.highScore = parseInt(highScore)
        } else {
            this.highScore = 0
        }

        this.notifyHighScoreSubscribers()
    }

    public resetHighScore() {
        this.highScore = 0
        localStorage.removeItem('highScore') // Removes the high score from local storage
        this.notifyHighScoreSubscribers() // Notifies all high score subscribers about the reset
    }

    public getHighScore() {
        return this.highScore
    }

    public subscribeToScoreChange(subscriber: (score: number) => void) {
        this.scoreSubscribers.push(subscriber)
    }

    public unsubscribeFromScoreChange(subscriber: (score: number) => void) {
        this.scoreSubscribers = this.scoreSubscribers.filter(sub => sub !== subscriber)
    }

    public subscribeToHighScoreChange(subscriber: (highScore: number) => void) {
        this.highScoreSubscribers.push(subscriber)
    }

    public unsubscribeFromHighScoreChange(subscriber: (highScore: number) => void) {
        this.highScoreSubscribers = this.highScoreSubscribers.filter(sub => sub !== subscriber)
    }

    private notifyScoreSubscribers() {
        this.scoreSubscribers.forEach(subscriber => subscriber(this.score))
    }

    private notifyHighScoreSubscribers() {
        this.highScoreSubscribers.forEach(subscriber => subscriber(this.highScore))
    }
    
}

export default ScoreManager