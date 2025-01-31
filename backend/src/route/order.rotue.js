const {getlist,create,update,remove} = require("../controller/order.controller");

try{
    module.exports = (app) => {
        app.get("/api/order/getlist",getlist);
        app.post("/api/order/create",create);
        app.put("/api/order/update",update);
        app.delete("/api/order/delete",remove);
    }
}
catch(err){
    console.log(err);
}
