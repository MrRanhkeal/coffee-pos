const { db, logErr, isArray, isEmpty } = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        const [category] = await db.query("select id as value, name as label,description from category");
        const [role] = await db.query("select id, name from roles");
        const [supplier] = await db.query("select id, name from supplier");
        const brand ={
            coffee :[
                { label: "Arabia Coffee", value: "Arabia Coffee", country: "vn" },
            ]
        }
        const categories = {
            could :[
                { label: "Arabia Coffee", value: "Arabia Coffee", country: "vn" },
            ],
            hot :[
                { label: "Arabia Coffee", value: "Arabia Coffee", country: "vn" },
            ],
            soda:[
                { label: "Coca Cola", value: "Coca Cola", country: "kh" },
                { label: "Pepsi", value: "Pepsi", country: "kh" },
                { label: "7 Up", value: "7 Up", country: "kh" },
            ],
            col_tea:[
                { label: "Bodia Tea", value: "Bodia Tea", country: "kh" },
                { label: "ChaTraMue Tea", value: "ChaTraMue Tea", country: "th" },
            ]
        } 
        const name_product = [
            { label: "អាម៉ាហ្សូន", value: "អាម៉ាហ្សូន" },
            { label: "Mondolkiri", value: "Mondolkiri" },
            { label: "Vietnam", value: "Vietnam" },
        ];
        const brand_name = [
            { label: "khmer cup", value: "khmer cup" },
            { label: "vietnam cup", value: "vietnam cup" },
            { label: "orthers cup", value: "orthers cup" },


        ]; 
        const product_type = {
            Coffee: [
                { label: "Americano", value: "Americano" },
                { label: "Black Coffee", value: "Black Coffee" },
                { label: "Espresso", value: "Espresso" },
                { label: "ឡាតេ", value: "ឡាតេ" },
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
        const product_name = [
            { label: "អាម៉ាហ្សូន", value: "អាម៉ាហ្សូន" },
            { label: "Mondolkiri", value: "Mondolkiri" },
            { label: "Vietnam", value: "Vietnam" },
        ]; 
        const cup_product = {
            Cup_product: [
                { label: "Amazon", value: "Amazon" },
                { label: "Mondolkiri", value: "Mondolkiri" },
                { label: "Vietnam", value: "Vietnam" },
            ],
        };
        const expense_type = [
            { label: "ប្រាក់ខែបុគ្គលិក", value: "ប្រាក់ខែបុគ្គលិក" },
            { label: "Product Origin", value: "Product Origin" },
            { label: "Machine Maintenance", value: "Machine Maintenance" },
            { label: "Power Consumption", value: "Power Consumption" },
            { label: "Other", value: "Other" },
        ];
        const vendor_payee = [
            { label: "ប្រាក់ខែបុគ្គលិក", value: "ប្រាក់ខែបុគ្គលិក" },
            { label: "Machine Maintenance Payroll", value: "Machine Maintenance Payroll" },
            { label: "EDC Payroll", value: "EDC Payroll" },
            { label: "Supplier Payroll", value: "Supplier Payroll" },
            { label: "Other", value: "Other" },
        ];
        const payment_method = [
            { label: "សាច់ប្រាក់", value: "សាច់ប្រាក់" },
            { label: "Credit Card", value: "Credit Card" },
            { label: "Debit Card", value: "Debit Card" },
        ];
        const supplier_address = [
            { label: "ភ្នំពេញ", value: "ភ្នំពេញ" },
            { label: "Sihanoukville", value: "Sihanoukville" },
            { label: "Vientiane", value: "Vientiane" },
            { label: "Thailand", value: "Thailand" },
        ];
        const [customer] = await db.query(
            "select id as value, concat(name) as label, name from customers"
        );
        res.json({
            category,  
            brand,
            customer,
            expense_type,
            product_type,
            product_name,
            cup_product,
            categories,
            vendor_payee,
            payment_method,
            supplier_address,
            name_product,
            brand_name,
            message: "success"
        })
    }
    catch (error) {
        logErr("config.getlist", error, res);
    }
}; 