const {getlist,create,update,remove} = require("../controller/customer.controller");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) => {
        app.get("/api/customer/getlist",getlist);
        app.post("/api/customer/create",create);
        app.put("/api/customer/update",update);
        app.delete("/api/customer/delete",remove);
    }
}
catch(err){
    logErr("customer.route",err);
}
