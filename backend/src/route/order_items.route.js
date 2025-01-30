const {getlist,create} = require("../controller/order_items.controller");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) =>{
        app.get("/order_items/getlist",getlist);
        app.post("/order_items/create",create);
    }
}
catch(err){
    logErr("order_items.route",err);
}