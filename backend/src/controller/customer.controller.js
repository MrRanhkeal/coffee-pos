const {db, logErr} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        var [list] = await db.query("SELECT * FROM customers");
        res.json({
            data:list,
            message:"success"
        })
        // var list = "customer list";
        // res.json({
        //     data:list,
        //     message:"success"
        // })
    } 
    catch (error) {
        logErr("customer.getlist",error,res);
    }
};
exports.create = async (req, res) => {
    try {
        var sql = "insert into customers(name,phone,email,address,description,create_by) values(:name,:phone,:email,:address,:description,:create_by)";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })

        // var list = "customer create";
        // res.json({
        //     data:list,
        //     message:"success"
        // })
    } 
    catch (error) {
        logErr("customer.create",error,res);
    }
};
exports.update = async (req, res) => {
    try {
        var sql = "update customers set name=:name,phone=:phone,email=:email,address=:address,description=:description,create_by=:create_by where id=:id";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("customer.update",error,res);
    }
};
exports.remove = async (req, res) => {
    try {
        var sql = "delete from customers where id=:id";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("customer.remove",error,res);
    }
};
