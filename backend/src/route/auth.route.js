const { getlist, register, login, profile, logout, verify_email, reset_password, forgot_password } = require("../controller/auth.controller");
const { logErr } = require("../util/logErr");
const { validate_token } = require("../middleware/jwt_token");
try {
    module.exports = (app) => {
        app.get("/api/auth/get-list", validate_token(), getlist);
        app.post("/api/auth/register", register);
        app.post("/api/auth/login", login);
        app.get("/api/auth/profile", profile);
        app.get("/api/auth/logout", logout);
        app.put("/api/auth/verify-email", verify_email);
        app.put("/api/auth/forgot-password", forgot_password);
        app.put("/api/auth/reset-password", reset_password);
        //verify_email
        //reset_password
        //forgot_password
        //logout
    }
}
catch (err) {
    logErr("auth.route", err);
}


