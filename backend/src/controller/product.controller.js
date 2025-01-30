const {logErr, db,removeFile} = require("../util/helper");

exports.getlist = async (req, res ,next) => {
    try {
        var {txt_search,category_id,brand,page,is_list_all} = req.query;
        const pageSize = 10;
        page = Number(page) //1,2,3 ,-10
        const offset = (page - 1) * pageSize; //find the offset
        var sqlSelect = "SELECT p.*, c.name as category_name ";
        var sqlJoin = " FROM products p INNER JOIN category c ON p.category_id = c.id ";
        var sqlWhere = " WHERE true ";
        if (txt_search) {
            sqlWhere += " AND (p.name LIKE :txt_search OR p.barcode = :barcode) ";
        }
        if(category_id){
            sqlWhere += " AND p.category_id = :category_id ";
        }
        if(brand){
            sqlWhere += " AND p.brand = :brand ";
        }
        sqlLimit = " LIMIT " + pageSize + " OFFSET " + offset;
        if(is_list_all){
            sqlLimit = "";
        }
        var sqlList = sqlSelect + sqlJoin + sqlWhere + sqlLimit;
        var sqlparam = {
            text_search: "%" + txt_search + "%",
            barcode: txt_search,
            category_id,
            brand
        }
        const [list] = await db.query(sqlList,sqlparam);
        var dataCount = 0;
        if (page == 1) {
            let sqlTotal = "SELECT COUNT(p.id) as total " + sqlJoin + sqlWhere;
            var [dataCount] = await db.query(sqlTotal, sqlparam);
            dataCount = dataCount[0].total;
        }
        
        res.json({
            data:list, //response list
            dataCount:dataCount, //count list
            message:"success",
            error:false
        })
    }
    catch (error) {
        logErr("product.getlist",error,res);
    }
};

exports.create = async (req, res) => {
    try {
        var sql = "insert into products(category_id,barcode,name,brand,description,qty,price,discount,status,image,create_by) "+ 
            " values(:category_id,:barcode,:name,:brand,:description,:qty,:price,:discount,:status,:image,:create_by)";
        var [data] = await db.query(sql, {
            ...req.body,
            image: req.files?.upload_image[0]?.filename,
            create_by: req.auth?.name
        });
        if(req.files && req.files?.upload_image_optional){
            var paramImageProduct = [];
            req.files?.upload_image_optional.map((item,index) => {
                paramImageProduct.push([
                    data?.insertId,
                    item?.filename
                ]);
            });
            var sqlImageProduct = "insert into product_images(product_id,image) values :data";
            var [dataImage] = await db.query(sqlImageProduct,{
                data: paramImageProduct,
        
            });
        }
        res.json({
            data:data,
            message:"success",
            error:false
        })
    }
    catch (error) {
        logErr("product.create",error,res); 
    }
};
exports.update = async (req, res) => {
    try {
        var sql = 
            " UPDATE products SET " +
            " category_id=:category_id," +
            " barcode=:barcode," +
            " name=:name," +
            " brand=:brand," +
            " description=:description," +
            " qty=:qty," +
            " price=:price," +
            " discount=:discount," +
            " status=:status," +
            " image=:image" +
            " WHERE id=:id";

        var filename = req.body.image;
        //new img
        if(req.file){
            filename = req.file?.filename;
        }
        //change img
        if(req.body.image != "" && req.body.image != null && req.body.image != "null" && req.file){
            removeFile(req.body.image); //remove old img
        }
        if(req.body.image_remove == "1"){
            removeFile(req.body.image); //remove img
            filename = null;
        }

        var [data] = await db.query(sql, {
            ...req.body,
            image: filename,
            create_by: req.auth?.name
        });
        res.json({   
            data:data,
            message:"success",
            error:false
        })
    }
    catch (error) {
        logErr("product.update",error,res);
    }
};

exports.remove = async (req, res) => {
    try {
        var [data] = await db.query("DELETE FROM products WHERE id = :id", {
            id: req.body.id //null data
        });
        if(data.affectedRows && req.body.image != "" && req.body.image != null){
            removeFile(req.body.image);
        }
        res.json({
            data:data,
            message:"success",
            error:false
        })
    }
    catch (error) {
        logErr("remove.create",error,res);
    }
};
exports.newBarcode = async (req, res) => {
    try{
        var sql = 
            "select " +
            "CONCAT('p',LPAD((select COALESCE(MAX(id),0) + 1 FROM products), 3, '0')) " +
            "as barcode";
        var [data] = await db.query(sql);
        res.json({
            barcode: data[0].barcode,
            message:"success",
            error:false
        })
    }
    catch (error) {
        logErr("remove.create",error,res);
    }
};
exports.productImage = async (req, res) => {
    try {
        var sql = "SELECT COUNT(id) as Total FROM products WHERE barcode =:product_id ";
        var [list] = await db.query(sql, {
            barcode: barcode
        });
        if(data.length > 0 && data[0].Total > 0){
            return true; //is double data
        }
        return false; //none double
    }
    catch (err) {
        logErr("remove.create", err, res);
    }
};