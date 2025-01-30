const {db, logErr} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        var [list] = await db.query("SELECT * FROM suppliers");
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("supplier.getlist", error, res);
    }
}
exports.create = async (req, res) => {
    try {
        var [list] = await db.query("INSERT INTO suppliers SET ?", req.body);
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("supplier.create", error, res);
    }
};
exports.update = async (req, res) => {
    try {
        var [list] = await db.query("UPDATE suppliers SET ? WHERE id = ?", [req.body, req.params.id]);
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("supplier.update", error, res);
    }
};
exports.remove = async (req, res) => {
    try {
        var [list] = await db.query("DELETE FROM suppliers WHERE id = ?", req.params.id);
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("supplier.remove", error, res);
    }
};



