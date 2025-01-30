const {getlist,create} = require("../controller/invoice.controller");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) => {
        app.get("/invoice/getlist",getlist);
        app.post("/invoice/create",create);
    }
}
catch(err){
    logErr("invoice.route",err);
}

