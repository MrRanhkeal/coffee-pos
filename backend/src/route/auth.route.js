const { getlist, register, login, profile, logout, verify_email, reset_password, forgot_password } = require("../controller/auth.controller");
const { logErr } = require("../util/logErr");
const { validate_token } = require("../middleware/jwt_token");
try {
    module.exports = (app) => {
        app.get("/auth", validate_token(), getlist);
        app.post("/auth", register);
        app.post("/auth/login", login);
        app.get("/auth/profile", profile);
        app.get("/auth/logout", logout);
        app.put("/auth/verify-email", verify_email);
        app.put("/auth/forgot-password", forgot_password);
        app.put("/auth/reset-password", reset_password);
        //verify_email
        //reset_password
        //forgot_password
        //logout
    }
}
catch (err) {
    logErr("auth.route", err);
}


