const Scores = require ('./Scores');
const Handicap = require ('./Handicap');
const CourseAlign = require ('./CourseAlign');
const Putts = require ('./Putts');

class Statistics {
    constructor(playerName) {
        this.playerName = playerName;
        this.scores = new Scores();
        this.handicap = new Handicap();
        this.courseAlign = new CourseAlign();
        this.putts = new Putts();
    }

    /**
     * Calculates the average score of all the rounds the player has played
     */
    calculateOverallAverageScore = async function() {
        return this.scores.calculateOverallAverageScore(this.playerName);
    }

    /**
     * Calculates the players best ever score and the course it was done
     */
    calculateBestScore = async function() {
        return this.scores.calculateBestScore(this.playerName);
    }

    /**
     * Gets the 20 latest rounds total scores 
     */
    calculateScoreTotals = async function() {
        return this.scores.calculateScoreTotals(this.playerName);
    }

    /**
     * Calculates the players handicap
     */
    calculateHandicap = async function() {
        return this.handicap.calculateHandicap(this.playerName);
    }

    /**
     * Calculates the average score for each par type
     */
    calculateParAverages = async function() {
        return this.courseAlign.calculateParAverages(this.playerName);
    }

    /**
     * Determines if a hole score is an eagle, birdie, par, bogey, etc
     */
    totalHoleScores = async function() {
        return this.courseAlign.totalHoleScores(this.playerName);
    }

    totalRoundPutts = async function() {
        return this.putts.totalRoundPutts(this.playerName);
    }

    puttsPerHole = async function() {
        return this.putts.puttsPerHole(this.playerName);
    }

    greensInRegulationPercent = async function() {
        return this.courseAlign.greensInRegulationPercent(this.playerName);
    }
}

module.exports = Statistics;