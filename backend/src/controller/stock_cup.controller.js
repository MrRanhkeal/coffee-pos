const {db, logErr} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {

        var [data] = await db.query("SELECT * FROM stock_cup ORDER BY id DESC");
        res.json({
            data: data,
            message: "success"
        });
    } catch (error) {
        logErr("stock_cup.getlist", error, res);
    }

};

//create
exports.create = async (req, res) => {
    try {
        const sqlInsert = "insert into stock_cup (name, qty, supplier_id,description,status) values(?,?,?,?,?)";

        var [data] = await db.query(sqlInsert, [
            req.body.name,
            req.body.qty,
            req.body.supplier_id,
            req.body.description,
            req.body.status
        ]);

        res.json({
            data: data,
            message: "Stock inserted successfully"
        });
    } 
    catch (error) {
        logErr("stock_cup.create", error, res);
    }
};
exports.update = async (req, res) => {
    try {
        const sqlUpdate = "update stock_cup set name=?, qty=?, supplier_id=?, description=?, status=? where id=?";
        var [data] = await db.query(sqlUpdate, [
            req.body.name, 
            req.body.qty, 
            req.body.supplier_id, 
            req.body.description,
            req.body.status,
            req.body.id
        ]);
        res.json({
            data: data,
            message: "Stock updated successfully"
        });
    } catch (error) {
        logErr("stock_cup.update", error, res);
    }
}
exports.remove = async (req, res) => {
    try {
        const sqlDelete = "DELETE FROM stock_cup WHERE id=?";
        var [data] = await db.query(sqlDelete, [req.body.id]);

        res.json({
            data: data,
            message: "Stock deleted successfully"
        });
    } catch (error) {
        logErr("stock_cup.remove", error, res);
    }
};