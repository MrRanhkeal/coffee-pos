const {getlist,create} = require("../controller/order_items.controller");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) =>{
        app.get("/api/order_items",getlist);
        app.post("/api/order_items",create);
    }
}
catch(err){
    logErr("order_items.route",err);
}