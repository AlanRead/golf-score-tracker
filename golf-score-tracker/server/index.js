const express = require("express");
const app = express();
const cors = require("cors");

// The database we will input and retrieve from
const pool = require("./db");
const { text } = require("express");

const CourseAlign = require("./CourseAlign");
const Scores = require ('./Scores');
const Handicap = require ('./Handicap');
const Putts = require ('./Putts');

app.use(cors());
app.use(express.json());

//post request to create new course if entered
app.post("/create_course", async(req, res) => {
    try {
        const { courseName, courseRating, slopeRating, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, total } = req.body;
        const text = "INSERT INTO course (course_name, course_rating, slope_rating, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, \
            h17, h18, total) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *";
        const values = [courseName, courseRating, slopeRating, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, total];

        await pool.query(text, values);

    } catch (err) {
        console.log(err.message);
    }
})

//Send course names to the course selection dropdown
app.get("/choose_course", async(req, res) => {
    try {
        const text = "SELECT course_name FROM course";
        await pool.query(text, function(err, result) {
            res.send(result.rows);
        });
    } catch (err) {
        console.error(err.message);
    }
})

//Select the users desired course, get the par for each hole, and send to the front-end
app.post("/choose_course", async(req, res) => {
    try {
        const { selectedCourse } = req.body;
        const text = "SELECT h1, h2,h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, total FROM course WHERE course_name=$1";
        const values = [selectedCourse];

        await pool.query(text, values, function(err, result) {
            res.send(result.rows);
        });
    } catch (err) {
        console.error(err.message);
    }
})

//Store the scores from the players edited score card
app.post("/score_card", async(req, res) => {
    try {
        const { playerName, courseName, gameDate, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, p1, p2, p3, 
            p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, total, puttTotal } = req.body;
        let textScore = "INSERT INTO score_card (player_name, course_name, game_date, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, \
            h16, h17, h18, total) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *";

        let textPutts = "INSERT INTO putt_card (player_name, course_name, game_date, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, \
            p16, p17, p18, putt_total) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *";

        let scoreValues = [playerName, courseName, gameDate, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, total];
        let puttValues = [playerName, courseName, gameDate, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, puttTotal];
        if (gameDate == '') {
            textScore = "INSERT INTO score_card (player_name, course_name, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, \
                h16, h17, h18, total) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *";

            textPutts = "INSERT INTO putt_card (player_name, course_name, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, \
                p16, p17, p18, putt_total) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *";

            scoreValues = [playerName, courseName, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, total];
            puttValues = [playerName, courseName, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, puttTotal];
        }
        await pool.query(textScore, scoreValues);
        await pool.query(textPutts, puttValues);
    } catch (err) {
        console.error(err.message);
    }
})

//Gets all of the players to be loaded in the player dropdown of the stats page
app.get("/statistics", async(req, res) => {
    playerDropDown(res);
})

//Gets all of the players to be loaded in the player dropdown
playerDropDown = async function (res) {
    try {
        const text = "SELECT DISTINCT player_name FROM score_card";
        await pool.query(text, function(err, result) {
            res.send(result.rows);
        });
    } catch (err) {
        console.error(err.message);
    }
}

//Calculates basic statistics of a specified player and sends it to the front-end
app.post("/statistics", async(req, res) => {
    try {
        const { selectedPlayer } = req.body;
        const courseAlgin = new CourseAlign();
        const scores = new Scores();
        const handicap = new Handicap();
        const putts = new Putts();

        let convertJson = [];
        
        const avgScore = await scores.calculateOverallAverageScore(selectedPlayer);
        const bestScoreInfo = await scores.calculateBestScore(selectedPlayer);
        const scoreTypes = await courseAlgin.totalHoleScores(selectedPlayer);
        const playerHandicap = await handicap.calculateHandicap(selectedPlayer);
        const holeAverage = await courseAlgin.calculateParAverages(selectedPlayer);
        const totalScores = await scores.calculateScoreTotals(selectedPlayer);
        const totalPutts = await putts.totalRoundPutts(selectedPlayer);
        const puttsPerHole = await putts.puttsPerHole(selectedPlayer);
        const greensInReg = await courseAlgin.greensInRegulationPercent(selectedPlayer);

        convertJson.push.apply(convertJson, [avgScore, bestScoreInfo, scoreTypes, playerHandicap, holeAverage, totalScores, totalPutts, puttsPerHole, greensInReg]);

        let jsonString = JSON.stringify(convertJson);
        res.send(jsonString);
    } catch (err) {
        console.error(err.message);
    }
})

//Gets all of the players to be loaded in the player dropdown of the score card page
app.get("/game_scores", async(req, res) => {
    playerDropDown(res);
})

//Gets all of the players score cards
app.post("/game_scores", async(req, res) => {
    try {
        const { selectedPlayer } = req.body;
        const courses = "SELECT course_name, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, total FROM course";
        const scoreCards = "SELECT course_name, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, total FROM score_card WHERE player_name=$1 ORDER BY game_date ASC";

        const coursesResponse = await pool.query(courses);
        const scoreCardResponse = await pool.query(scoreCards, [selectedPlayer]);
        const align = new CourseAlign();
        let convertJson = [];

        let courseList = align.createCourseMap(coursesResponse);
        let scoreList = align.createScoreCardMap(scoreCardResponse);

        convertJson.push.apply(convertJson, [courseList, scoreList]);
        let jsonString = JSON.stringify(convertJson);
        res.send(jsonString);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
});