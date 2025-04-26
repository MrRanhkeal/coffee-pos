const { db, logErr, isArray, isEmpty } = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        const [category] = await db.query(
            "select id as value, name as label,description from category");
        const [role] = await db.query("select id, name, permissions from roles");
        const [supplier] = await db.query("select id, name ,code from supplier");
        //and more
        
        const brand = [
            { label: "arabia", value: "arabia", country: "th" },
            { label: "mondolkiri", value: "mondolkiri", country: "kh" },
            { label: "green-tea", value: "green-tea", country: "kh" },
            { label: "passion-fruit", value: "passion-fruit", country: "kh" },
            { label: "soda", value: "soda", country: "kh" },
            { label: "snack", value: "snack", country: "kh" },
            { label: "fresh-fruit", value: "fresh-fruit", country: "kh" },
        ];

        // const [customer] = await db.query(
        //     "select id as value, concat(name,'-',phone) as label, name, phone, email from customers"
        // );

        const [customer] = await db.query(
            "select id as value, concat(name) as label, name from customers"
        );
        const [expense_type] = await db.query("SELECT * FROM expense_type");

        res.json({
            category,
            role,
            supplier,
            brand,
            customer,
            expense_type,
        })
    }
    catch (error) {
        logErr("config.getlist", error, res);
    }
};

exports.getstocklist = async (req, res) => {
    try {
        var sqlselete = 
        
            "select " +
            // "p.id  p_id," +
            "p.name  p_name," +
            "p.qty p_qty," +
            "p.brand p_brand," +
            "c.name c_name," +
            " u.create_by "  +
            " from products p " +
            "inner join category c on p.category_id = c.id "+
            "inner join users u on p.create_by = u.name ";
            // "where p.status = 1 and p.qty > 0";
        const [stock] = await db.query(sqlselete);
        res.json({
            data:stock,
            message: "success"
        })
    }
    catch (error) {
        logErr("config.getlist", error, res);
    }
};