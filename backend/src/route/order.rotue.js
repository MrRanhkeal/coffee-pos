const {getlist,create,update,remove,getone} = require("../controller/order.controller");
const {validate_token} = require("../middleware/jwt_token");
try{
    module.exports = (app) => {
        app.get("/api/order",validate_token(),getlist);
        app.get("/api/order_detail/:id",validate_token(),getone);
        app.post("/api/order",validate_token(),create);
        app.put("/api/order",validate_token(),update);
        app.delete("/api/order",validate_token(),remove);
    }
}
catch(err){
    console.log(err);
}
