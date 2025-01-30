
const {db, logErr,isEmpty,isArray} = require("../util/helper");


exports.getlist = async (req, res) => {
    try {
        //please select and sort data
        var [list] = await db.query("SELECT * FROM category");
        res.json({
            
            list:list,
            message:"success"
        })
    } 
    catch (error) {
        //logErr(,error,res);
        logErr("category.getlist",error,res);
    }
};
exports.create = async (req, res) => {
    try {
        var sql = "insert into category(name,code,description,image,create_by) values(:name,:code,:description,:image,:create_by)";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("category.create",error,res);
    }
};
exports.update = async (req, res) => {
    try {
        var sql = "update category set name=:name,code=:code,description=:description,description=:description,status=:status,image=:image where id=:id";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("category.update",error,res);
    }
};
exports.remove = async (req, res) => {
    try {
        var sql = "delete from category where id=:id";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("category.remove",error,res);
    }
};

