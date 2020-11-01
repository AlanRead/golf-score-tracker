const pool = require("./db");

class Scores {
    constructor() {
        this.totalScoreText = "SELECT total FROM score_card WHERE player_name=$1";
    }

    /**
     * Calculates the average score of all the rounds the player has played
     */
    calculateOverallAverageScore = async function(playerName) {
        try {
            let totalScore = 0;
            let avgScore = 0;
            const response = await pool.query(this.totalScoreText, [playerName]);
            let numRounds = response.rows.length;
            for (let i = 0; i < numRounds; i ++) {
                totalScore += response.rows[i].total;
            }
            avgScore = totalScore / numRounds;
            //rounds to the nearest tenth
            return avgScore.toFixed(1);
        } catch (err) {
            console.error(err.message);
        }
    }

    /**
     * Calculates the players best ever score and the course it was done
     */
    calculateBestScore = async function(playerName) {
        try {
            const response = await pool.query(this.totalScoreText, [playerName]);
            let bestScore = response.rows[0].total;
            let numRounds = response.rows.length;

            if (numRounds > 1) {
                for (let i = 1; i < numRounds; i ++) {
                    if (response.rows[i].total < bestScore) {
                        bestScore = response.rows[i].total;
                    }
                }
            }
            const courseNameText = "SELECT course_name FROM score_card WHERE total=$1"
            const courseResponse = await pool.query(courseNameText, [bestScore]);

            let courseName = courseResponse.rows[0].course_name;
            return [bestScore, courseName];
        } catch (err) {
            console.error(err.message);
        }
    }

    /**
     * Gets the 20 latest rounds total scores 
     */
    calculateScoreTotals = async function(playerName) {
        try {
            const text = "SELECT game_date, total FROM score_card WHERE player_name=$1 ORDER BY game_date ASC LIMIT 20";

            const response = await pool.query(text, [playerName]);

            const totalScoreMap = {};
            let round = response.rows;
            let key = '';

            for (let i = 0; i < round.length; i ++) {
                key = round[i].game_date.toString();
                key = key.substring(4, 10);
                totalScoreMap[key] = round[i].total;
            }
            return totalScoreMap;
        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = Scores;