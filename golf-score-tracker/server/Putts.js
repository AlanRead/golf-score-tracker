const pool = require("./db");

class Putts {

    totalRoundPutts = async function(playerName) {
        text = "SELECT course_name, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18 FROM putt_card WHERE player_name=$1";
        const response = await pool.query(getScoreCards, [playerName]);
        
    }
}

module.exports = CourseAlign;