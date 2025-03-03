const {getlist,create,update,remove} = require("../controller/order.controller");

try{
    module.exports = (app) => {
        app.get("/api/order",getlist);
        app.post("/api/order",create);
        app.put("/api/order",update);
        app.delete("/api/order",remove);
    }
}
catch(err){
    console.log(err);
}
