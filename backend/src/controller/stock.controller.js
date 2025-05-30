const {db, logErr} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {

        var [data] = await db.query("SELECT * FROM product_stock ORDER BY id DESC");
        res.json({
            data: data,
            message: "success"
        });
    } catch (error) {
        logErr("stock.getlist", error, res);
    }

};

//create
exports.create = async (req, res) => {
    try {
        const sqlInsert = "insert into product_stock (name, category,stock_qty, brand, barcode, image) values (?,?,?,?,?,?)";

        var [data] = await db.query(sqlInsert, [
            req.body.category,
            req.body.name,
            req.body.stock_qty,
            req.body.brand,
            req.body.barcode,
            req.body.image
        ]);

        res.json({
            data: data,
            message: "Stock inserted successfully"
        });
    } 
    catch (error) {
        logErr("stock.create", error, res);
    }
};
exports.update = async (req, res) => {
    try {
        const sqlUpdate = "UPDATE product_stock SET name=?, category=?, stock_qty=?, brand=?, barcode=?, image=? WHERE id=?";
        var [data] = await db.query(sqlUpdate, [
            req.body.category,
            req.body.name,
            req.body.stock_qty,
            req.body.brand,
            req.body.barcode,
            req.body.image,
            req.body.id
        ]);

        res.json({
            data: data,
            message: "Stock updated successfully"
        });
    } catch (error) {
        logErr("stock.update", error, res);
    }
}
exports.remove = async (req, res) => {
    try {
        const sqlDelete = "DELETE FROM product_stock WHERE id=?";
        var [data] = await db.query(sqlDelete, [req.body.id]);

        res.json({
            data: data,
            message: "Stock deleted successfully"
        });
    } catch (error) {
        logErr("stock.remove", error, res);
    }
};