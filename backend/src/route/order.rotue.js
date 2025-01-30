const {getlist,create,update,remove} = require("../controller/order.controller");

try{
    module.exports = (app) => {
        app.get("/order/getlist",getlist);
        app.post("/order/create",create);
        app.put("/order/update",update);
        app.delete("/order/delete",remove);
    }
}
catch(err){
    console.log(err);
}
