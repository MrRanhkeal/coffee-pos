const { validate_token } = require("../middleware/jwt_token");
const {getList, create, update, remove,} = require("../controller/expense.controller");
module.exports = (app) => {
    app.get("/api/expense", validate_token(), getList);
    app.post("/api/expense", validate_token(), create);
    app.put("/api/expense", validate_token(), update);
    app.delete("/api/expense", validate_token(), remove);
};
