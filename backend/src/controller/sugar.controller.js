const { db, logErr } = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        const sql = "SELECT * FROM sugar_level ORDER BY level_name";
        const [list] = await db.query(sql);
        res.json({
            list: list,
            message: "success"
        });
    } catch (error) {
        logErr("sugar.getlist", error, res);
    }
};

exports.create = async (req, res) => {
    try {
        const sql = "INSERT INTO sugar_level (level_name) VALUES (:level_name)";
        const [data] = await db.query(sql, req.body);
        res.json({
            data: data,
            message: "Insert success!"
        });
    } catch (error) {
        logErr("sugar.create", error, res);
    }
};

exports.update = async (req, res) => {
    try {
        const sql = "UPDATE sugar_level SET level_name=:level_name WHERE id=:id";
        const [data] = await db.query(sql, req.body);
        res.json({
            data: data,
            message: "Update success!"
        });
    } catch (error) {
        logErr("sugar.update", error, res);
    }
};

exports.remove = async (req, res) => {
    try {
        const [data] = await db.query("DELETE FROM sugar_level WHERE id = :id", req.body);
        res.json({
            data: data,
            message: "Delete success!"
        });
    } catch (error) {
        logErr("sugar.remove", error, res);
    }
};
