
const {getlist,create,update,remove} = require("../controller/supplier.controller");
const { logErr } = require("../util/logErr");


try{
    module.exports = (app) => {
        app.get("/supplier", getlist);
        app.post("/supplier", create);
        app.put("/supplier", update);
        app.delete("/supplier", remove);
    }
}
catch(err){
    logErr("supplier.route",err);
}