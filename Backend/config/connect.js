const { connect } = require("mongoose");
const db_connect = async () => {
    try {
        await connect(process.env.MONGO_DB);
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
};
module.exports = db_connect;
