const {getlist,create} = require("../controller/invoice.controller");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) => {
        app.get("/api/invoice/getlist",getlist);
        app.post("/api/invoice/create",create);
    }
}
catch(err){
    logErr("invoice.route",err);
}

