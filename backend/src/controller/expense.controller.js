const { db, isArray, isEmpty, logErr } = require("../util/helper");

exports.getList = async (req, res) => {
    try {
        var txtSearch = req.query.txtSearch;
        var sql = "SELECT * FROM expenses ";
        if (!isEmpty(txtSearch)) {
            sql += " WHERE ref_no LIKE :txtSearch";
        }
        const [list] = await db.query(sql, {
            txtSearch: "%" + txtSearch + "%",
        });
        res.json({
            list: list,
        });
    } catch (error) {
        logErr("expense.getList", error, res);
    }
}; 
exports.create = async (req, res) => {
    try {
        var sql =
            "INSERT INTO expenses (product_id,ref_no,name,amount,remarks,expense_date,expanse_type,create_by) VALUES (?) ";
        var [data] = await db.query(sql, {
            ...req.body,
            create_by: req.auth?.name,
        });
        res.json({
            data: data,
            message: "Insert success!",
        });
    } catch (error) {
        logErr("expense.create", error, res);
    }
};

exports.update = async (req, res) => {
    try {
        var sql =
            "UPDATE  customer set name=:name, code=:code, tel=:tel, email=:email, address=:address, website=:website, note=:note WHERE id=:id ";
        var [data] = await db.query(sql, {
            ...req.body,
        });
        res.json({
            data: data,
            message: "Update success!",
        });
    } catch (error) {
        logErr("expense.update", error, res);
    }
};

exports.remove = async (req, res) => {
    try {
        var [data] = await db.query("DELETE FROM expenses WHERE id = :id", {
            ...req.body,
        });
        res.json({
            data: data,
            message: "Data delete success!",
        });
    } catch (error) {
        logErr("expense.remove", error, res);
    }
};
