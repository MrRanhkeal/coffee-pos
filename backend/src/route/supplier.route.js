
const { getlist, create, update, remove } = require("../controller/supplier.controller");
const { validate_token } = require("../middleware/jwt_token");
const { logErr } = require("../util/logErr");


try {
    module.exports = (app) => {
        app.get("/api/supplier",validate_token(), getlist);
        app.post("/api/supplier", create);
        app.put("/api/supplier", update);
        app.delete("/api/supplier", remove);
    }
}
catch (err) {
    logErr("supplier.route", err);
}