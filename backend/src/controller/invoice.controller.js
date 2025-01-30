const {db,logErr} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
       var [list] = await db.query("SELECT * FROM invoices");
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("invoice.getlist",error,res);
    }
};
exports.create = async (req, res) => {
    try {
        var sql = "insert into invoices(invoice_no,customer_id,invoice_date,order_id,product_id,total_amount,tax_amount,disconnect_amount,payment_method,paid_date,payment_status,create_by) values(:invoice_no,:customer_id,:invoice_date,:order_id,:product_id,:total_amount,:tax_amount,:disconnect_amount,:payment_method,:paid_date,:payment_status,:create_by)";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("invoice.create",error,res);
    }
}
