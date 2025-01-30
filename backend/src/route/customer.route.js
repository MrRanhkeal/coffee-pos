const {getlist,create,update,remove} = require("../controller/customer.controller");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) => {
        app.get("/customer/getlist",getlist);
        app.post("/customer/create",create);
        app.put("/customer/update",update);
        app.delete("/customer/delete",remove);
    }
}
catch(err){
    logErr("customer.route",err);
}
