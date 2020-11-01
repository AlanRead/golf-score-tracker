const pool = require("./db");

class CourseAlign { 

    /**
     * Calculates the average score for each par type
     */
    calculateParAverages = async function(playerName) {
        try {
            let holeAverage = {3 : 0, 4 : 0, 5 : 0}
            let currTotal = 0;
            let scoreMap = await this.alignCourseScore(playerName);
            for (let [par, score] of Object.entries(scoreMap)) {
                currTotal = score.reduce((a, b) => a + b, 0);
                holeAverage[par] = (currTotal/score.length).toFixed(1);
            }
            return holeAverage;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Determines if a hole score is an eagle, birdie, par, bogey, etc
     * 
     * TODO: This needs to be refactored
     */
    totalHoleScores = async function(playerName) {
        try {
            let scoreType = {'Eagle': 0, 'Birdie': 0, 'Par': 0, 'Bogey': 0, 'Double Bogey': 0, 'Triple Bogey': 0, 'Uh Oh': 0}
            let scoreMap = await this.alignCourseScore(playerName);
            let scoreDif;

            for (let [par, score] of Object.entries(scoreMap)) {
                for (let i = 0; i < score.length; i ++) {
                    scoreDif = score[i] - par;
                    if(scoreDif == -2) {
                        scoreType["Eagle"] += 1;
                    }
                    if(scoreDif == -1) {
                        scoreType["Birdie"] += 1;
                    }
                    if(scoreDif == 0) {
                        scoreType["Par"] += 1;
                    }
                    if(scoreDif == 1) {
                        scoreType["Bogey"] += 1;
                    }
                    if(scoreDif == 2) {
                        scoreType["Double Bogey"] += 1;
                    }
                    if(scoreDif == 3) {
                        scoreType["Triple Bogey"] += 1;
                    }
                    if(scoreDif == 4) {
                        scoreType["Uh Oh"] += 1;
                    }
                }
            }
            return scoreType;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Correlates each score card hole score with the par type from the course table
     */
    alignCourseScore = async function(playerName) {
        try {
            const getCourse = "SELECT course_name, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18 FROM course";
            const getScoreCards = "SELECT course_name, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18 FROM score_card WHERE player_name=$1";

            const coursesResponse = await pool.query(getCourse);
            const scoreCardResponse = await pool.query(getScoreCards, [playerName]);

            let courseMap = {};
            let scoreCardMap = {};
            let scoreMap = {3:[], 4:[], 5:[]};

            //Puts all of the courses in a map with course name as the key and the par scores in an array as the value
            courseMap = this.createCourseMap(coursesResponse);
            //Puts all of the score cards in a map with course name as the key and the scores in an array as the value
            scoreCardMap = this.createScoreCardMap(scoreCardResponse);

            let courseCards = [];
            for (let [courseName, coursePars] of Object.entries(courseMap)) {
                //Checks if the course key exists in the player's score card
                if (!(courseName in scoreCardMap)) {
                    continue;
                }
                courseCards = scoreCardMap[courseName];
                //Goes through all of score cards listed in the array
                for(let i = 0; i < courseCards.length; i ++) {
                    //Puts all the scores in the corresponding par slot
                    for (let j = 0; j < courseCards[i].length; j ++) {
                        if (coursePars[j] == 3) {
                            scoreMap[3].push(courseCards[i][j]);
                        }
                        if (coursePars[j] == 4) {
                            scoreMap[4].push(courseCards[i][j]);
                        } 
                        if (coursePars[j] == 5) {
                            scoreMap[5].push(courseCards[i][j]);
                        }
                    }
                }
            }
            return scoreMap;
        } catch (err) {
            console.error(err);
        }
    }

    

    /**
     * Helper function to put all of the courses into a map. There's probably a better way to do this lol
     * Key: Course name
     * Value: Array of par scores
     */
    createCourseMap = function(response) {
        let pars = [];
        let courseKey = '';
        let courseMap = {};
        for (let i = 0; i < response.rows.length; i ++) {
            pars = Object.values(response.rows[i]).slice();
            courseKey = pars[0];
            pars.splice(0, 1);
            courseMap[courseKey] = pars;
        }
        return courseMap;
    }

    /**
     * Helper function to put all of the player's score cards into a map
     * Key: Course name
     * Value: Array of par scores in an array
     */
    createScoreCardMap = function(response) {
        let pars = [];
        let courseKey = '';
        let scoreMap = {};
        for (let i = 0; i < response.rows.length; i ++) {
            pars = Object.values(response.rows[i]).slice();
            courseKey = pars[0];
            pars.splice(0, 1);
            if (courseKey in scoreMap) {
                scoreMap[courseKey].push(pars);
            } else {
                scoreMap[courseKey] = [pars];
            }
        }
        return scoreMap;
    }   

}

module.exports = CourseAlign;