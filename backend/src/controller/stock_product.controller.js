const {db, logErr} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {

        var [data] = await db.query("SELECT * FROM stock_product ORDER BY id DESC");
        res.json({
            data: data,
            message: "success"
        });
    } catch (error) {
        logErr("stock_product.getlist", error, res);
    }

};

//create
exports.create = async (req, res) => {
    try {
        const sqlInsert = "insert into stock_product (name, qty, supplier_id,product_id,description,status) values(?,?,?,?,?,?)";

        var [data] = await db.query(sqlInsert, [
            req.body.name,
            req.body.qty,
            req.body.supplier_id,
            req.body.product_id,
            req.body.description,
            req.body.status
        ]);

        res.json({
            data: data,
            message: "Stock inserted successfully"
        });
    } 
    catch (error) {
        logErr("stock_product.create", error, res);
    }
};
exports.update = async (req, res) => {
    try {
        const sqlUpdate = "update stock_product set name=?, qty=?, supplier_id=?, product_id=?, description=?, status=? where id=?";
        var [data] = await db.query(sqlUpdate, [
            req.body.name, 
            req.body.qty, 
            req.body.supplier_id, 
            req.body.product_id,
            req.body.description,
            req.body.status,
            req.body.id
        ]);
        res.json({
            data: data,
            message: "Stock updated successfully"
        });
    } catch (error) {
        logErr("stock_product.update", error, res);
    }
}
exports.remove = async (req, res) => {
    try {
        const sqlDelete = "DELETE FROM stock_product WHERE id=?";
        var [data] = await db.query(sqlDelete, [req.body.id]);

        res.json({
            data: data,
            message: "Stock deleted successfully"
        });
    } catch (error) {
        logErr("stock_product.remove", error, res);
    }
};