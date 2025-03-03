const {getlist,create} = require("../controller/invoice.controller");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) => {
        app.get("/api/invoice",getlist);
        app.post("/api/invoice",create);
    }
}
catch(err){
    logErr("invoice.route",err);
}

