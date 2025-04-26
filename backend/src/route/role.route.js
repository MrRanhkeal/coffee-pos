const {getlist,create,update,remove} = require("../controller/role.controller");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) => {
        app.get("/api/role",getlist);
        app.post("/api/role",create);
        app.put("/api/role",update);
        app.delete("/api/role",remove);
    }
}
catch(err){
    logErr("role.route", err);
}