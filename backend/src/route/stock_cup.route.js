const { getlist,create,update,remove } = require("../controller/stock_cup.controller");
const { validate_token } = require("../middleware/jwt_token");
const { logErr } = require("../util/logErr");
try{
    module.exports = (app) => {
    app.get("/api/stock_cup",validate_token(),getlist);
    app.post("/api/stock_cup",validate_token(),create);
    app.put("/api/stock_cup",validate_token(),update);
    app.delete("/api/stock_cup",validate_token(),remove);
    }
}
catch(err){
    logErr("stock_cup.route",err);
}