const {db,logErr,isArray,isEmpty} = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        const [category] = await db.query("select id as value, name as label, description from category");
        const [role] = await db.query("select id, name, code from roles");
        //and more
        res.json({
            category,
            role,
            message:"success"
        })
    } 
    catch (error) {
        logErr("config.getlist",error,res);
    }
};
