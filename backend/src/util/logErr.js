const fs = require("fs/promises");
const moment = require("moment-timezone");
exports.logErr = async (controller,mess_err,res) => {
    try{
        const ofset = moment().tz("UTC+7").format("YYYY-MM-DD HH:mm:ss z"); // Replace 'UTC' with your desired timezone (e.g., 'America/New_York')
        const path = "./logs/" + controller + ".txt";
        //const logMessage = `${mess_err} - ${timestamp}\n`;
        const logMessage = mess_err + " + " + ofset +  "\n";
        await fs.appendFile(path,logMessage);
    }
    catch(error){
        console.log("Error writing to log file:", error);
    }
    res.status(500).send("Internal Server Error!");
};
