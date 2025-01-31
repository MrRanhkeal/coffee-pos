const {getlist,create,update,remove} = require("../controller/role.controller");

try{
    module.exports = (app) => {
        app.get("/api/role/getlist",getlist);
        app.post("/api/role/create",create);
        app.put("/api/role/update",update);
        app.delete("/api/role/delete",remove);
    }
}
catch(err){
    
}