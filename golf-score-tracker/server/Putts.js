const pool = require("./db");

class Putts {

    /**
     * Calculates the latest 20 rounds' total number of putts for each round of golf played
     */
    totalRoundPutts = async function(playerName) {
        try {
            const text = "SELECT game_date, putt_total FROM putt_card WHERE player_name=$1 ORDER BY game_date ASC LIMIT 20";
            const response = await pool.query(text, [playerName]);

            let totalPuttMap = {};
            let round = response.rows;
            let key = '';

            for (let i = 0; i < round.length; i ++) {
                key = round[i].game_date.toString();
                key = key.substring(4, 10);
                totalPuttMap[key] = round[i].putt_total;
            }
            return totalPuttMap;
        } catch (err) {
            console.error(err.message);
        }
    }

    /**
     * Calculates the number of putts per hole 
     */
    puttsPerHole = async function(playerName) {
        try {
            const text = "SELECT p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18 FROM putt_card WHERE player_name=$1";
            const response = await pool.query(text, [playerName]);

            let puttsPerHole = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, "Yikes": 0};
            let round = response.rows;

            for (let i = 0; i < round.length; i ++) {
                for (let [hole, putts] of Object.entries(round[i])) {
                    if (putts < 5) {
                        puttsPerHole[putts] += 1;
                    } else {
                        puttsPerHole['Yikes'] += 1;
                    }
                }
            }
            return puttsPerHole
        } catch (err) {
            console.error(err.message);
        }
    }

}

module.exports = Putts;