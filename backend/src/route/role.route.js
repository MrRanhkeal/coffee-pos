const {getlist,create,update,remove} = require("../controller/role.controller");

try{
    module.exports = (app) => {
        app.get("/role/getlist",getlist);
        app.post("/role/create",create);
        app.put("/role/update",update);
        app.delete("/role/delete",remove);
    }
}
catch(err){
    
}