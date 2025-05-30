const { db, logErr, isArray, isEmpty } = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        const [category] = await db.query("select id as value, name as label,description from category");
        const [role] = await db.query("select id, name, permissions from roles");
        const [supplier] = await db.query("select id, name ,code from supplier");
        //and more

        const brand = [
            { label: "arabia", value: "arabia", country: "th",icon: "https://cdn-icons-png.flaticon.com/512/1040/1040204.png" },
            { label: "mondolkiri", value: "mondolkiri", country: "kh" },
            { label: "green-tea", value: "green-tea", country: "kh" },
            { label: "passion-fruit", value: "passion-fruit", country: "kh" },
            { label: "soda", value: "soda", country: "kh" },
            { label: "snack", value: "snack", country: "kh" },
            { label: "fresh-fruit", value: "fresh-fruit", country: "kh" },
        ];
        //sugar
        // const sugar = [
        //     { label: "0%", value: "0", name: "sugar" },
        //     { label: "10%", value: "10", name: "sugar" },
        //     { label: "25%", value: "25", name: "sugar" },
        //     { label: "50%", value: "50", name: "sugar" },
        //     { label: "75%", value: "75", name: "sugar" },
        //     { label: "100%", value: "100", name: "sugar" }
        // ];
        //productdetail
        // const productdetail = [
        //     {label:"Flavor", value:"Mocha"},
        //     {label:"Flavor", value:"more-flavor"},
        // ]
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
            SodaTea: [
                { label: "Green Tea Lemon", value: "Green Tea Lemon" },
                { label: "Black Tea Lemon", value: "Black Tea Lemon" },
                { label: "Blue Tea Lemon Soda", value: "Blue Tea Lemon Soda" },
                { label: "Passion Honey Lemon Soda", value: "Passion Honey Lemon Soda" },
                { label: "Strawberry Soda", value: "Strawberry Soda" },
                { label: "Blueberry Soda", value: "Blueberry Soda" },
                { label: "Apple Soda", value: "Apple Soda" },
                { label: "Kiwi Soda", value: "Kiwi Soda" },
                { label: "Blue Hawaii Soda", value: "Blue Hawaii Soda" },
                { label: "Passion Strawberry Soda", value: "Passion Strawberry Soda" }
            ],
            Iced_Tea: [
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
            Smoothie: [
                { label: "Green Tea Coconut", value: "Green Tea Coconut" },
                { label: "Avocado Coconut", value: "Avocado Coconut" },
                { label: "Avocado", value: "Avocado" },
                { label: "Avocado Green Tea", value: "Avocado Green Tea" },
                { label: "Avocado Chocolate", value: "Avocado Chocolate" },
                { label: "Mango", value: "Mango" },
                { label: "Dragon Fruit", value: "Dragon Fruit" },
                { label: "Banana", value: "Banana" },
                { label: "Papaya", value: "Papaya" },
                { label: "Passion", value: "Passion" }
            ],
            Coconut: [
                { label: "Avocado Coconut", value: "Avocado Coconut" },
                { label: "Chocolate Coconut", value: "Chocolate Coconut" },
                { label: "Thai Tea Coconut", value: "Thai Tea Coconut" },
                { label: "Orange Coconut Milk", value: "Orange Coconut Milk" },
                { label: "Avocado Mango Coconut", value: "Avocado Mango Coconut" },
                { label: "Dragon Fruit Coconut", value: "Dragon Fruit Coconut" }
            ],
            Cream_Jelly: [
                { label: "Green Tea Cream Cheese", value: "Green Tea Cream Cheese" },
                { label: "Black Tea Cream Cheese", value: "Black Tea Cream Cheese" },
                { label: "Passion Cream Cheese", value: "Passion Cream Cheese" },
                { label: "Brown Sugar Milk Tea Bubble", value: "Brown Sugar Milk Tea Bubble" },
                { label: "Milk Tea Jelly", value: "Milk Tea Jelly" },
                { label: "Green Tea Jelly", value: "Green Tea Jelly" },
                { label: "Red Tea Jelly", value: "Red Tea Jelly" },
                { label: "Chocolate Jelly", value: "Chocolate Jelly" },
                { label: "Green Tea Oreo Shake", value: "Green Tea Oreo Shake" },
                { label: "Blueberry Oreo Shake", value: "Blueberry Oreo Shake" },
                { label: "Vanilla Jelly, Chocolate Jelly", value: "Vanilla Jelly, Chocolate Jelly" }
            ],
            Snack: [
                { label: "Chip", value: "Chip" },
                { label: "Original Cheese Chilli", value: "Original Cheese Chilli" },
                { label: "Nugget & Chips", value: "Nugget & Chips" },
                { label: "Hotdog Cheese", value: "Hotdog Cheese" },
                { label: "Double Sandwich Ham", value: "Double Sandwich Ham" },
                { label: "Cheese Pizza", value: "Cheese Pizza" },
                { label: "Pizza Cheese & Corn", value: "Pizza Cheese & Corn" },
                { label: "Double Sweet Chocolate Ovaltine", value: "Double Sweet Chocolate Ovaltine" },
                { label: "Crabs Pizza", value: "Crabs Pizza" },
                { label: "Hotdog Pizza", value: "Hotdog Pizza" }
            ],
        };

        const expsanse_type = [
            { label: "maintenance", value: "maintenance" ,stauts: 1},
            { label: "management", value: "management" ,stauts: 1},
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
            // sugar,
            product_type,
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