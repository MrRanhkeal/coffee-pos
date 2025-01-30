const {db} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        // var txtSearch = req.query.txtSearch;
        // var sql = "select * from order";

        var list = "order_items list";
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        var list = "order_items create";
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        console.log(error);
    }
};

