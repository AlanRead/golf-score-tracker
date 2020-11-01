const pool = require("./db");

class Handicap {

    /**
     * Calculates the players handicap
     */
    calculateHandicap = async function(playerName) {
        try {
            let scoreDifferentials = await this.calculateScoreDifferential(playerName);
            let numDifferentials = scoreDifferentials.length;
            let takenDiff = 0;
            //default
            if(numDifferentials < 3) {
                return 54.0;
            }
            //take lowest score differential
            else if (numDifferentials >= 3 && numDifferentials <= 5) {
                return Math.min(...scoreDifferentials);
            }
            //take lowest 2
            else if (numDifferentials > 5 && numDifferentials <= 8) {
                takenDiff = 2;
            }   
            //lowest 3
            else if (numDifferentials == 9 && numDifferentials == 10) {
                takenDiff = 3;
            }
            //lowest 4
            else if (numDifferentials == 11 && numDifferentials == 12) {
                takenDiff = 4;
            }
            //lowest 5
            else if (numDifferentials == 13 || numDifferentials == 14) {
                takenDiff = 5;
            }
            //lowest 6
            else if (numDifferentials == 15 || numDifferentials == 16) {
                takenDiff = 6;
            }
            //lowest 7
            else if (numDifferentials == 17) {
                takenDiff = 7;
            }
            //lowest 8
            else if (numDifferentials == 18) {
                takenDiff = 8;
            }
            //lowest 9
            else if (numDifferentials == 19) {
                takenDiff = 9;
            }
            //lowest 10
            else if (numDifferentials == 20) {
                takenDiff = 10;
            }
            return (await this.totalSmallestDifferentials(scoreDifferentials, takenDiff)/takenDiff).toFixed(1);

        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Totals all of the smallest round differentials
     * @param {*} differentials The array of differentials
     * @param {*} numDifferentials The number of differentials to take (Takes the smallest ones)
     */
    totalSmallestDifferentials = async function (differentials, numDifferentials) {
        let smallestDiffAry = [];
        let smallestDiff = 0;
        let index = 0;
        for (let i = 0; i < numDifferentials; i ++) {
            smallestDiff = Math.min(...differentials);
            smallestDiffAry.push(smallestDiff);
            index = differentials.indexOf(smallestDiff.toString());
            differentials.splice(index, 1);
        }
        let total = smallestDiffAry.reduce((a, b) => a + b, 0);
        return total;
    }

    /**
     * Calculates the score differential of the most recent rounds
     * ScoreDifferential = ((PlayerScore - CourseRating) * 113) / SlopRating   Round to the tenths place
     */
    calculateScoreDifferential = async function(playerName) {
        try{
            const textScoreCard = "SELECT course_name, total FROM score_card WHERE player_name=$1 ORDER BY game_date DESC LIMIT 20";
            const courseText = "SELECT course_name, course_rating, slope_rating FROM course";

            const scoreResponse = await pool.query(textScoreCard, [playerName]);
            const courseResponse = await pool.query(courseText);

            let courseMap = {};
            let courseKey = '';
            let difficulty = [];

            let scoreTotals = scoreResponse.rows;
            let course = courseResponse.rows;

            for(let i = 0; i < course.length; i ++) {
                difficulty = Object.values(course[i]).slice();
                courseKey = difficulty[0];
                difficulty.splice(0, 1);
                courseMap[courseKey] = difficulty;
            }

            let scoreDifferentials = [];
            let currDifferential = 0;

            for (let i = 0; i < scoreTotals.length; i ++) {
                currDifferential = (((scoreTotals[i].total - courseMap[scoreTotals[i].course_name][0]) * 113) / courseMap[scoreTotals[i].course_name][1]).toFixed(1);
                scoreDifferentials.push(currDifferential);
            }
            return scoreDifferentials;
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = Handicap;