const { db, logErr, isArray, isEmpty } = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        const [category] = await db.query(
            "select id as value, name as label,description from category");
        const [role] = await db.query("select id, name, code from roles");
        const [supplier] = await db.query("select supplier_id, name ,code from suppliers");
        //and more
        const [product_type] = await db.query("select * from product_type");
        const purchase_status = [
            {
                lebel: "Pending",
                value: "Pending",
            },
            {
                lebel: "Approved",
                value: "Approved",
            },
            {
                lebel: "Shiped",
                value: "Shiped",
            },
            {
                lebel: "Received",
                value: "Received",
            },
            {
                lebel: "Issues",
                value: "Issues",
            },
        ];
        const brand = [
            { label: "arabia", value: "arabia", country: "th" },
            { label: "mondolkiri", value: "mondolkiri", country: "kh" },
            { label: "green-tea", value: "green-tea", country: "kh" },
            { label: "passion-fruit", value: "passion-fruit", country: "kh" },
            { label: "soda", value: "soda", country: "kh" },
            { label: "snack", value: "snack", country: "kh" },
            { label: "fresh-fruit", value: "fresh-fruit", country: "kh" },
        ];


        res.json({
            category,
            role,
            supplier,
            brand,
            product_type,
            purchase_status,
            message: "success"
        })
    }
    catch (error) {
        logErr("config.getlist", error, res);
    }
};
