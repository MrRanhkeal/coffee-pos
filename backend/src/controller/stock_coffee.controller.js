const {db, logErr, isEmpty, isArray} = require('../util/helper');

exports.getlist = async (req, res) => {
    try {
        
        var [data] = await db.query('SELECT * FROM stock_coffee ORDER BY id DESC');
        res.json({
            // data: result.rows, 
            data: data, 
            status: 'success',
        });
    } catch (err) {
        logErr("stock_coffee.getlist", err); 
    }
}

exports.create = async (req, res) => {
    try {
        const { name, qty } = req.body;
        if (isEmpty(name) || isEmpty(qty)) {
            return res.status(400).json({ status: 'error', message: 'Invalid input' });
        }
        
        const sqlInsert = "INSERT INTO stock_coffee (name, supplier_id, qty,description,status) values(?,?,?,?,?)"; 
        //values ($1, $2, $3, $4, $5) RETURNING *
        //RETURNING * for return values from rows affected by insert updata or deleted 
        const data = await db.query(sqlInsert, [
            req.body.name,
            req.body.supplier_id,
            req.body.qty,
            req.body.description || null, // Optional field
            req.body.status || null, // Optional field
        ]); 
        res.status(200).json({ 
            // data: result.rows[0]
            data: data,
            status: 'success',
            message: 'Coffee stock created successfully'
        });
    } catch (err) {
        logErr("stock_coffee.create", err); 
    }
}

exports.update = async (req, res) => {
    try {
        const { id, name, quantity, price } = req.body;
        if (isEmpty(id) || isEmpty(name) || isEmpty(quantity) || isEmpty(price)) {
            return res.status(400).json({ status: 'error', message: 'Invalid input' });
        }
        
        const query = `UPDATE stock_coffee SET name = $1, quantity = $2, price = $3 WHERE id = $4 RETURNING *`;
        const values = [name, quantity, price, id];
        
        const result = await db.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ status: 'error', message: 'Coffee not found' });
        }
        
        res.json({
            status: 'success',
            data: result.rows[0]
        });
    } catch (err) {
        logErr("stock_coffee.controller.update", err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.body;
        if (isEmpty(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid input' });
        }
        
        const query = `DELETE FROM stock_coffee WHERE id = $1 RETURNING *`;
        const values = [id];
        
        const result = await db.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ status: 'error', message: 'Coffee not found' });
        }
        
        res.json({
            status: 'success',
            data: result.rows[0]
        });
    } catch (err) {
        logErr("stock_coffee.controller.remove", err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}