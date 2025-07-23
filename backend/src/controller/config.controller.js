const { db, logErr, isArray, isEmpty } = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        const [category] = await db.query("select id as value, name as label,description from category"); 
        const [role] = await db.query("select id, name from roles");
        const [supplier] = await db.query("select id, name from supplier");
        //and more

        const brand = [ 
            { label: "Mondolkiri Coffee", value: "Mondolkiri Coffee", country: "kh" },
            { label: "Arabia Coffee", value: "Arabia Coffee", country: "vn" },
            { label: "Amazon Coffee", value: "Amazon Coffee", country: "th" },
            { label: "Bodia Tea", value: "Bodia Tea", country: "kh" },
            { label: "ChaTraMue Tea", value: "ChaTraMue Tea", country: "th" },
            { label: "Soda", value: "Soda", country: "kh" }, 
            { label: "Milk", value: "Milk", country: "kh" },  
            { label: "Coconut", value: "Coconut", country: "kh" },  
            // { label: "arabia", value: "arabia", country: "th", icon: "https://cdn-icons-png.flaticon.com/512/1040/1040204.png" },
            // { label: "mondolkiri", value: "mondolkiri", country: "kh" },
            // { label: "green-tea", value: "green-tea", country: "kh" },
            // { label: "passion-fruit", value: "passion-fruit", country: "kh" }, 
        ];
        //product_type
        const product_type = {
            Coffee: [
                { label: "Americano", value: "Americano" },
                { label: "Black Coffee", value: "Black Coffee" },
                { label: "Espresso", value: "Espresso" },
                { label: "Latte", value: "Latte" },
                { label: "Coffee Milk", value: "Coffee Milk" },
                { label: "Coffee Mocha", value: "Coffee Mocha" },
                { label: "Coffee Vanilla", value: "Coffee Vanilla" },
                { label: "Coffee Honey", value: "Coffee Honey" },
                { label: "Coffee Avocado", value: "Coffee Avocado" },
                { label: "Coffee Strawberry", value: "Coffee Strawberry" },
                { label: "Coffee Dream", value: "Coffee Dream" },
                { label: "Coffee with Cream", value: "Coffee with Cream" },
                { label: "Coffee Coconut", value: "Coffee Coconut" },
                { label: "Coffee Latte Matcha", value: "Coffee Latte Matcha" },
                { label: "Coffee Chocolate Coconut", value: "Coffee Chocolate Coconut" }
            ], 
        };

        const product_name =  {
            Coffee: [
                { label: "Amazon", value: "Amazon" }, 
                { label: "Mondolkiri", value: "Mondolkiri" },
                { label: "Vietnam", value: "Vietnam" },
            ],
            Tea: [
                { label: "Laluna Green Tea Milk", value: "Laluna Green Tea Milk" },
                { label: "Thai Tea Milk", value: "Thai Tea Milk" },
                { label: "Milo Milk", value: "Milo Milk" },
                { label: "Ovaltine Milk", value: "Ovaltine Milk" },
                { label: "Taro Milk", value: "Taro Milk" },
                { label: "Chocolate Milk", value: "Chocolate Milk" },
                { label: "Oreo Milk", value: "Oreo Milk" },
                { label: "Strawberry Milk", value: "Strawberry Milk" },
                { label: "Blueberry Milk", value: "Blueberry Milk" },
                { label: "Soda Milk", value: "Soda Milk" },
                { label: "Passion Milk", value: "Passion Milk" },
                { label: "Ginger Milk", value: "Ginger Milk" },
                { label: "Matcha Latte", value: "Matcha Latte" }
            ],
        };
        const cup_product =  {
            Cup_product: [
                { label: "Amazon", value: "Amazon" }, 
                { label: "Mondolkiri", value: "Mondolkiri" },
                { label: "Vietnam", value: "Vietnam" },
            ],
        };
        const expsanse_type = [
            { label: "Staff Salary", value: "Staff Salary" },
            { label: "Product Origin", value: "Product Origin" },
            { label: "Machine Maintenance", value: "Machine Maintenance" },
            { label: "Power Consumption", value: "Power Consumption" },
            { label: "Other", value: "Other" },
        ];

        const [customer] = await db.query(
            "select id as value, concat(name) as label, name from customers"
        );
        res.json({
            category,
            role,
            supplier,
            brand,
            customer,
            expsanse_type, 
            product_type,
            product_name,
            cup_product,
            message: "success"
        })
    }
    catch (error) {
        logErr("config.getlist", error, res);
    }
};

// exports.getstocklist = async (req, res) => {
//     try {
//         const sqlSelect =
//             "SELECT " +
//             "p.id, " +
//             "p.name AS p_name, " +
//             "p.qty AS p_qty, " +
//             "p.brand AS p_brand, " +
//             "c.name AS c_name, " +
//             "p.image AS p_image, " +
//             "p.create_by AS create_by, " +  // <-- Added comma here
//             "CASE " +
//             "WHEN p.qty <= 2 THEN 'Low' " +
//             "ELSE 'High' " +
//             "END AS stock_status " +
//             "FROM products p " +
//             "INNER JOIN category c ON p.category_id = c.id " +
//             "ORDER BY p.qty DESC"

//         const [stock] = await db.query(sqlSelect);
//         res.json({
//             data: stock,
//             message: "success"
//         });
//     } catch (error) {
//         logErr("config.getstocklist", error, res);
//     }

// };