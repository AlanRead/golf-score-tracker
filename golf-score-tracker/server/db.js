const Pool = require("pg").Pool;

const pool = new Pool({
    user: "Alan",
    password: "RedU$9p",
    host: "localhost",
    port: 5432,
    database: "golf_score_tracker"
});

module.exports = pool;