const {db,logErr,isArray,isEmpty} = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        const [category] = await db.query("select id as value, name as label, description from category");
        const [role] = await db.query("select id, name, code from roles");
        //and more
        const bran = [
            {label: "coffee", value: "amazon", country: "kh"},
            {label: "tea", value: "green-tea", country: "kh"},
            {label: "soda", value: "soda", country: "kh"},
            {label: "tea", value: "red-tea", country: "kh"},
        ];


        res.json({
            category,
            role,
            bran,
            message:"success"
        })
    } 
    catch (error) {
        logErr("config.getlist",error,res);
    }
};
