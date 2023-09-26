// Import the sequelize constructor from the library
const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

// Checks if JAWSDB_URL exists, and if yes, creates new Sequelize or creates with local .env
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: "localhost",
            dialect: "mysql",
            port: 3306
        }
    );
}

module.exports = sequelize;