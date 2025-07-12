const { db, logErr, isArray, isEmpty } = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        var txtSearch = req.query.txtSearch;
        var from_date = req.query.from_date;
        var to_date = req.query.to_date;
        var sqlSelect =
            "SELECT " +
            " o.* , c.name customer_name, c.phone customer_phone, c.address customer_address ";
        var sqlJoin =
            " FROM orders o  LEFT JOIN customers c ON o.customer_id = c.id";

        var sqlWhere = " Where true ";

        if (!isEmpty(txtSearch)) {
            sqlWhere += " AND order_no LIKE :txtSearch ";
        }
        // 2024-11-27 :from_date AND :to_date
        if (!isEmpty(from_date) && !isEmpty(to_date)) {
            // sqlWhere +=
            //   " AND DATE_FORMAT(o.create_at,'%Y-%m-%d')  >=  '2024-11-27' " +
            //   " AND  DATE_FORMAT(o.create_at,'%Y-%m-%d') <= '2024-11-27' ";
            sqlWhere +=
                " AND DATE_FORMAT(o.create_at,'%Y-%m-%d')  BETWEEN  :from_date AND :to_date ";
        }
        var sqlOrder = " ORDER BY o.id DESC ";

        var sqlParam = {
            txtSearch: "%" + txtSearch + "%",
            from_date: from_date,
            to_date: to_date,
        };
        var sqlList = sqlSelect + sqlJoin + sqlWhere + sqlOrder;

        var sqlSummary =
            " SELECT COUNT(o.id) total_order, SUM(o.total_amount) total_amount  " +
            sqlJoin +
            sqlWhere;
        const [list] = await db.query(sqlList, sqlParam);
        const [summary] = await db.query(sqlSummary, sqlParam);

        //var list = "select * from orders";

        res.json({
            list: list,
            summary: summary[0],
            message: "success"
        })
    }
    catch (error) {
        logErr("order.getlist", error, res);
    }
};

exports.orderdetail = async (req, res) => {
    try {
        var sql =
            "SELECT " +
            " od.*, " +
            " p.name p_name, " +
            " p.brand p_brand, " +
            " p.description p_des, " +
            " p.image p_image, " +
            " c.name p_category_name " +
            "FROM order_detail od " +
            "inner join products p on od.product_id = p.id " +
            "inner join category c on p.category_id = c.id " +
            "where od.order_id = :id";
        const [list] = await db.query(sql, { id: req.params.id });
        res.json({
            list: list,
            id: req.params.id,
        });
    } catch (error) {
        logErr("order.orderdetail", error, res);
    }
};

exports.create = async (req, res) => {
    // Start a database transaction
    let connection;
    try {
        // Assuming your `db` object has a method to get a connection and start a transaction
        // This might look different depending on your database library (e.g., mysql2, knex)
        connection = await db.getConnection(); // Get a connection from the pool
        await connection.beginTransaction();   // Start the transaction

        var { order, order_details = [] } = req.body;

        // Validate data and prepare order object
        order = {
            ...order,
            order_no: await newOrderNo(), // Generate order_no
            user_id: req.auth?.id,        // Current access user ID
            create_by: req.auth?.name,    // Current access user name
        };

        // 1. Insert into orders table
        var sqlOrder =
            "INSERT INTO orders (order_no,customer_id,total_amount,paid_amount,payment_method,remark,user_id,create_by) VALUES (:order_no,:customer_id,:total_amount,:paid_amount,:payment_method,:remark,:user_id,:create_by)";
        var [orderResult] = await connection.query(sqlOrder, order); // Use connection for query
        const orderId = orderResult.insertId;

        // Prepare order_details for bulk insertion and stock deduction
        const detailPromises = order_details.map(async (item) => {
            // Deduct stock for each item *before* inserting the order detail (or alongside it)
            // It's crucial that stock_cup has a product_id for accurate deduction.
            // If stock_cup doesn't have product_id, this logic needs adjustment.
            if (!item.stockproduct_id || !item.qty || !item.product_id) {
                console.warn('WARNING: Missing stockproduct_id, qty, or product_id for stock deduction in item:', item);
                // Depending on your business logic, you might throw an error here
                // or just skip stock deduction for this specific item.
            } else {
                let order_qty = parseInt(item.qty, 10);
                if (isNaN(order_qty) || order_qty <= 0) {
                    console.warn('WARNING: Invalid quantity for stock deduction:', item.qty, 'in order_detail item:', item);
                    // Decide whether to skip this item or throw an error
                    // For a robust system, you'd likely throw an error here to prevent incorrect stock deduction.
                    // For now, we'll just skip the deduction for this item.
                } else {
                    // Correct SQL for individual stock deduction based on the specific item's details
                    // This updates stock_cup directly using the item's stockproduct_id and product_id
                    // Ensure 'product_id' exists in your 'stock_cup' table as discussed previously.
                    var sqlDeductStock =
                        "UPDATE stock_product " +
                        "SET qty = qty - :deductQty " +
                        "WHERE id = :stockproduct_id AND product_id = :product_id"; // Add product_id condition
                    const [stockUpdateResult] = await connection.query(sqlDeductStock, { // Use connection for query
                        deductQty: order_qty,
                        stockproduct_id: item.stockproduct_id,
                        product_id: item.product_id // Make sure item has product_id
                    });

                    // Optional: Check if stock was actually updated (e.g., if rowCount === 0, stockproduct_id/product_id might be wrong)
                    if (stockUpdateResult.affectedRows === 0) {
                        console.warn(`WARNING: Stock not found or not updated for stockproduct_id: ${item.stockproduct_id}, product_id: ${item.product_id}. Check if stock exists or if quantity would go negative.`);
                        // You might want to throw an error here if stock must exist
                        throw new Error(`Insufficient stock or invalid stock location for product ID: ${item.product_id} at stockcup ID: ${item.stockproduct_id}`);
                    }
                }
            }

            // Insert order detail
            var sqlOrderDetails =
                "INSERT INTO order_detail (order_id,product_id,qty,price,discount,total,stockproduct_id,sugarLevel) VALUES (:order_id,:product_id,:qty,:price,:discount,:total,:stockproduct_id,:sugarLevel)";
            return connection.query(sqlOrderDetails, { // Use connection for query
                ...item,
                order_id: orderId, // Use the newly inserted order ID
            });
        });

        await Promise.all(detailPromises); // Wait for all detail inserts and stock deductions to complete

        // If all operations are successful, commit the transaction
        await connection.commit();

        // Fetch the created order for response
        const [currentOrder] = await db.query( // Can use `db` here as transaction is committed
            "SELECT * FROM orders WHERE id = :id",
            { id: orderId }
        );

        res.json({
            order: currentOrder.length > 0 ? currentOrder[0] : null,
            order_details: order_details,
            message: "Order created and stock deducted successfully!",
        });

    } catch (error) {
        // If an error occurs, roll back the transaction
        if (connection) {
            await connection.rollback();
            console.error('Transaction rolled back due to error:', error);
        }
        logErr("order.create", error, res);
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

// newOrderNo function remains the same, assuming it uses the main `db` connection
const newOrderNo = async () => {
    try {
        var sql =
            "SELECT " +
            "CONCAT('INV',LPAD((SELECT COALESCE(MAX(id),0) + 1 FROM orders), 3, '0')) " +
            "as order_no";
        var [data] = await db.query(sql);
        return data[0].order_no;
    }
    catch (error) {
        // You should not pass `res` here, as this is a utility function.
        // It should throw the error for the calling function to handle.
        console.error("Error generating new order number:", error);
        throw error; // Re-throw the error
    }
};


//create
// exports.create = async (req, res) => {
//     try {
//         var { order, order_details = [] } = req.body;
//         // validate data
//         order = {
//             ...order,
//             order_no: await newOrderNo(), // gener order_no
//             user_id: req.auth?.id, // currect access
//             create_by: req.auth?.name, // currect access
//         };
//         var sqlOrder =
//             "INSERT INTO orders (order_no,customer_id,total_amount,paid_amount,payment_method,remark,user_id,create_by) VALUES (:order_no,:customer_id,:total_amount,:paid_amount,:payment_method,:remark,:user_id,:create_by) ";
//         var [data] = await db.query(sqlOrder, order);

//         await Promise.all(order_details.map(async (item) => {
//             // Insert order detail
//             var sqlOrderDetails =
//                 "INSERT INTO order_detail (order_id,product_id,qty,price,discount,total,stockproduct_id) VALUES (:order_id,:product_id,:qty,:price,:discount,:total,:stockproduct_id) ";
//             await db.query(sqlOrderDetails, {
//                 ...item,
//                 order_id: data.insertId, // override key order_id
//             });
//             // Deduct stock from stock_cup for each item
//             if (item.stockproduct_id && item.qty) {
//                 // Defensive: ensure qty is a positive integer from order_detail
//                 let order_qty = parseInt(item.qty, 10);
//                 if (isNaN(order_qty) || order_qty <= 0) {
//                     console.warn('WARNING: Invalid qty for stock deduction:', item.qty, 'in order_detail:', item);
//                     return;
//                 }
//                 console.log('DEBUG: Cutting stock for stockproduct_id:', item.stockproduct_id, 'order_qty:', order_qty);
//                 var sqlReStock =
//                     "UPDATE stock_cup sc"+
//                     "JOIN order_detail od ON sc.id = od.stockproduct_id AND sc.product_id = od.product_id "+
//                     "SET sc.qty = sc.qty - od.qty "+
//                     "WHERE od.order_id = :order_id AND sc.id = :stockproduct_id";
//                 const [updateResult] = await db.query(sqlReStock, {
//                     order_qty,
//                     stockproduct_id: item.stockproduct_id,
//                 });
//                 console.log('DEBUG: Stock update result:', updateResult);
//             }
//         }));

//         // Use Promise.all to wait for all order details to be inserted
//         // await Promise.all(order_details.map(async (item) => {
//         //     // order product
//         //     var sqlOrderDetails =
//         //         "INSERT INTO order_detail (order_id,product_id,qty,price,discount,total) VALUES (:order_id,:product_id,:qty,:price,:discount,:total) ";
//         //     await db.query(sqlOrderDetails, {
//         //         ...item,
//         //         order_id: data.insertId, // override key order_id
//         //     });
//         //     //cut stock when order =1 set stock_cup(qty - 1)
//         //     // re stock modify stock relation to product_stock
//         //     // var sqlReStock =
//         //     //     "UPDATE products SET qty = (qty-:order_qty) WHERE id = :product_id ";
//         //     // await db.query(sqlReStock, {
//         //     //     order_qty: item.qty,
//         //     //     product_id: item.product_id,
//         //     // });
//         // }));

//         const [currentOrder] = await db.query(
//             "select * from orders where id=:id",
//             {
//                 id: data.insertId,
//             }
//         );

//         res.json({
//             order: currentOrder.length > 0 ? currentOrder[0] : null,
//             order_details: order_details,
//             message: "Insert success!",
//         });
//     } catch (error) {
//         logErr("order.create", error, res);
//     }
// };

//fix create
// exports.create = async (req, res) => {
//     // Start a database transaction
//     let connection;
//     try {
//         // Assuming your `db` object has a method to get a connection and start a transaction
//         // This might look different depending on your database library (e.g., mysql2, knex)
//         connection = await db.getConnection(); // Get a connection from the pool
//         await connection.beginTransaction();   // Start the transaction

//         var { order, order_details = [] } = req.body;

//         // Validate data and prepare order object
//         order = {
//             ...order,
//             order_no: await newOrderNo(), // Generate order_no
//             user_id: req.auth?.id,        // Current access user ID
//             create_by: req.auth?.name,    // Current access user name
//         };

//         // 1. Insert into orders table
//         var sqlOrder =
//             "INSERT INTO orders (order_no,customer_id,total_amount,paid_amount,payment_method,remark,user_id,create_by) VALUES (:order_no,:customer_id,:total_amount,:paid_amount,:payment_method,:remark,:user_id,:create_by)";
//         var [orderResult] = await connection.query(sqlOrder, order); // Use connection for query
//         const orderId = orderResult.insertId;

//         // Prepare order_details for bulk insertion and stock deduction
//         const detailPromises = order_details.map(async (item) => {
//             // Deduct stock for each item *before* inserting the order detail (or alongside it)
//             // It's crucial that stock_cup has a product_id for accurate deduction.
//             // If stock_cup doesn't have product_id, this logic needs adjustment.
//             if (!item.stockproduct_id || !item.qty || !item.product_id) {
//                 console.warn('WARNING: Missing stockproduct_id, qty, or product_id for stock deduction in item:', item);
//                 // Depending on your business logic, you might throw an error here
//                 // or just skip stock deduction for this specific item.
//             } else {
//                 let order_qty = parseInt(item.qty, 10);
//                 if (isNaN(order_qty) || order_qty <= 0) {
//                     console.warn('WARNING: Invalid quantity for stock deduction:', item.qty, 'in order_detail item:', item);
//                     // Decide whether to skip this item or throw an error
//                     // For a robust system, you'd likely throw an error here to prevent incorrect stock deduction.
//                     // For now, we'll just skip the deduction for this item.
//                 } else {
//                     // Correct SQL for individual stock deduction based on the specific item's details
//                     // This updates stock_cup directly using the item's stockproduct_id and product_id
//                     // Ensure 'product_id' exists in your 'stock_cup' table as discussed previously.
//                     console.log('[DEBUG] Attempting to deduct stock:', {
//                         stockproduct_id: item.stockproduct_id,
//                         product_id: item.product_id,
//                         deductQty: order_qty
//                     });
//                     var sqlDeductStock =
//                         "UPDATE stock_cup " +
//                         "SET qty = qty - :deductQty " +
//                         "WHERE id = :stockproduct_id AND product_id = :product_id"; // Add product_id condition
//                     const [stockUpdateResult] = await connection.query(sqlDeductStock, { // Use connection for query
//                         deductQty: order_qty,
//                         stockproduct_id: item.stockproduct_id,
//                         product_id: item.product_id // Make sure item has product_id
//                     });
//                     console.log('[DEBUG] Stock deduction result:', stockUpdateResult);

//                     // Optional: Check if stock was actually updated (e.g., if rowCount === 0, stockproduct_id/product_id might be wrong)
//                     if (stockUpdateResult.affectedRows === 0) {
//                         console.warn(`WARNING: Stock not found or not updated for stockproduct_id: ${item.stockproduct_id}, product_id: ${item.product_id}. Check if stock exists or if quantity would go negative.`);
//                         // You might want to throw an error here if stock must exist
//                         throw new Error(`Insufficient stock or invalid stock location for product ID: ${item.product_id} at stockcup ID: ${item.stockproduct_id}`);
//                     }
//                 }
//             }

//             // Ensure stockproduct_id is present; if not, fetch it
//             if (!item.stockproduct_id) {
//                 const [cupRows] = await connection.query(
//                     "SELECT id FROM stock_cup WHERE product_id = :product_id AND qty > 0 LIMIT 1",
//                     { product_id: item.product_id }
//                 );
//                 if (!cupRows || cupRows.length === 0) {
//                     throw new Error(`No cup stock available for product_id ${item.product_id}`);
//                 }
//                 item.stockproduct_id = cupRows[0].id;
//             }
//             // Insert order detail
//             var sqlOrderDetails =
//                 "INSERT INTO order_detail (order_id,product_id,qty,price,discount,total,stockproduct_id) VALUES (:order_id,:product_id,:qty,:price,:discount,:total,:stockproduct_id)";
//             return connection.query(sqlOrderDetails, { // Use connection for query
//                 ...item,
//                 order_id: orderId, // Use the newly inserted order ID
//             });
//         });

//         await Promise.all(detailPromises); // Wait for all detail inserts and stock deductions to complete

//         // If all operations are successful, commit the transaction
//         await connection.commit();

//         // Fetch the created order for response
//         const [currentOrder] = await db.query( // Can use `db` here as transaction is committed
//             "SELECT * FROM orders WHERE id = :id",
//             { id: orderId }
//         );

//         res.json({
//             order: currentOrder.length > 0 ? currentOrder[0] : null,
//             order_details: order_details,
//             message: "Order created and stock deducted successfully!",
//         });

//     } catch (error) {
//         // If an error occurs, roll back the transaction
//         if (connection) {
//             await connection.rollback();
//             console.error('Transaction rolled back due to error:', error);
//         }
//         logErr("order.create", error, res);
//     } finally {
//         // Release the connection back to the pool
//         if (connection) {
//             connection.release();
//         }
//     }
// };
// //newOrderNo
// // const newOrderNo = async () => {
// //     try {
// //         var sql =
// //             "SELECT " +
// //             "CONCAT('INV',LPAD((SELECT COALESCE(MAX(id),0) + 1 FROM orders), 3, '0')) " +
// //             "as order_no";
// //         var [data] = await db.query(sql);
// //         return data[0].order_no;
// //     }
// //     catch (error) {
// //         logErr("newOrderNo.create", error, res);
// //     }
// // };

// //fix newOrderNo
// const newOrderNo = async () => {
//     try {
//         var sql =
//             "SELECT " +
//             "CONCAT('INV',LPAD((SELECT COALESCE(MAX(id),0) + 1 FROM orders), 3, '0')) " +
//             "as order_no";
//         var [data] = await db.query(sql);
//         return data[0].order_no;
//     }
//     catch (error) {
//         // You should not pass `res` here, as this is a utility function.
//         // It should throw the error for the calling function to handle.
//         console.error("Error generating new order number:", error);
//         throw error; // Re-throw the error
//     }
// };

exports.update = async (req, res) => {
    try {
        var sql = "update orders set order_no=:order_no, customer_id=:customer_id, total_amount=:total_amount, paid_amount=:paid_amount, payment_method=:payment_method, remark=:remark, user_id=:user_id, create_by=:create_by where id=:id";
        // var sql =
        // "UPDATE  order set name=:name, code=:code, tel=:tel, email=:email, address=:address, website=:website, note=:note WHERE id=:id ";
        var [data] = await db.query(sql, {
            ...req.body,
        });
        res.json({
            data: data,
            message: "Update success!",
        });
    }
    catch (error) {
        logErr("order.update", error, res);
    }
};

exports.remove = async (req, res) => {
    try {
        var [list] = await db.query("DELETE FROM orders WHERE id = :id", {
            ...req.body,
        });
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("order.remove", error, res);
    }
};