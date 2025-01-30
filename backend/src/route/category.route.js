const {getlist,create,update,remove} = require("../controller/category.controller");
const { logErr } = require("../util/logErr");
const {validate_token} = require("../middleware/jwt_token");
//const { admin } = require("../middleware/auth/admin");

try{
    module.exports = (app) => {
        app.get("/category",validate_token(),getlist);
        app.post("/category",create); //test admin
        app.put("/category",update);
        app.delete("/category",remove);
    }
}
catch(err){
    logErr("category.route",err);
}