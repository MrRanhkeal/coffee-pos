const e = require("express");
const { db, isArray, isEmpty, logErr } = require("../util/helper");

exports.getList = async (req, res) => {
    try {
        var txtSearch = req.query.txtSearch;
        var sql = "SELECT * FROM expenses ";
        if (!isEmpty(txtSearch)) {
            sql += " WHERE expense_date LIKE :txtSearch";
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
        const { expense_type, amount, description } = req.body;
        if (isEmpty(expense_type) || isEmpty(amount)) {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }

        var sqlinsert = "insert into expenses(expense_type,amount,description,create_by) values(:expense_type,:amount,:description,:create_by)";
        var data = await db.query(sqlinsert, [
            expense_type,
            amount,
            description,
            req.auth?.name
        ])
        // var [data] = await db.query(sql, {
        //     ...req.body,
        //     create_by: req.auth?.name,
        // });
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
        const { expense_type, amount, description } = req.body;
        if (isEmpty(expense_type) || isEmpty(amount)) {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
        var sqlupdate = "update expenses set expense_type=:expense_type,amount=:amount,description=:description where id=:id";
        var [data] = await db.query(sqlupdate, {
            expense_type,
            amount,
            description,
            id
        });
        if (data.affectedRows > 0) {
            res.json({
                data: data,
                message: "Update success!",
            });
        } else {
            res.json({
                data: data,
                message: "Data not found!",
            });
        }
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
