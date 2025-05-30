const { getlist,create,update,remove } = require("../controller/stock.controller");
const { validate_token } = require("../middleware/jwt_token");
const { logErr } = require("../util/logErr");
try{
    module.exports = (app) => {
    app.get("/api/stock",validate_token(),getlist);
    app.post("/api/stock",validate_token(),create);
    app.put("/api/stock",validate_token(),update);
    app.delete("/api/stock",validate_token(),remove);
    }
}
catch(err){
    logErr("stock.route",err);
}