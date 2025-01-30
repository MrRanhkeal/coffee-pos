const {db, logErr } = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        var [list] = await db.query("SELECT * FROM orders");
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("order.getlist",error,res);
    }
};
exports.create = async (req, res) => {
    try {
        var sql = "insert into orders(order_no,customer_id,user_id,paid_amount,payment_method,remark,create_by) values(order_no,customer_id,user_id,paid_amount,payment_method,remark,create_by)";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("order.create",error,res);
    }
};
//newOrderNo
// const newOrderNo = async (req, res) => {
//     try {
//         var sql =
//             "SELECT " +
//             "CONCAT('INV',LPAD((SELECT COALESCE(MAX(id),0) + 1 FROM `order`), 3, '0')) " +
//             "as order_no";
//         var [data] = await db.query(sql);
//         return data[0].order_no;
//     } 
//     catch (error) {
//         logErr("newOrderNo.create", error, res);
//     }
// };

exports.update = async (req, res) => {
    try {
        var sql = "update orders set order_no=:order_no,customer_id=:customer_id,user_id=:user_id,paid_amount=:paid_amount,payment_method=:payment_method,remark=:remark,create_by=:create_by where id=:id";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("order.update",error,res);
    }
};
exports.remove = async (req, res) => {
    try {
        var sql = "delete from orders where id=:id";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("order.remove",error,res);
    }
};
