const {getlist} = require("../controller/config.controller");
const { validate_token } = require("../middleware/jwt_token");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) => {
        app.get("/api/configs",validate_token(),getlist);
    };
}
catch(err){
    logErr("config.route",err);
}