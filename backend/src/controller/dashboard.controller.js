const { logErr } = require("../util/logErr");
const { } = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        const [customer] = await db.query("SELECT count(id) total from customers");
        //and more data

        const [sale] = await db.query(
            "SELECT " +
            " CONCAT(CONVERT(SUM(r.total_amount),CHAR),'$')  total " +
            " ,count(r.id) total_order  " +
            " FROM orders r  " +
            " WHERE " +
            " MONTH(r.create_at) = MONTH(CURRENT_DATE)" +
            " AND YEAR(r.create_at) = YEAR(CURRENT_DATE)"
        );
        const [sale_summary_by_month] = await db.query(
            " SELECT " +
            "   DATE_FORMAT(r.create_at,'%M') title" +
            "   ,SUM(r.total_amount)  total" +
            " FROM orders r " +
            " WHERE" +
            "   YEAR(r.create_at) = YEAR(CURRENT_DATE)" +
            " GROUP BY " +
            "   MONTH(r.create_at) "
        );
        //and more data

        let dashboard = [
            {
                title: "Customer",
                summary: {
                    Total: customer[0].total,
                    Male: 10,
                    Femal: 12,
                },
            },
            // {
            //     title: "Employee",
            //     summary: {
            //         Total: employee[0].total,
            //         Male: 1,
            //         Femal: 2,
            //     },
            // },
            {
                title: "Sale",
                summary: {
                    Sale: "This Month",
                    Total: sale[0].total,
                    Total_Order: sale[0].total_order,
                },
            },
        ]
        res.json({
            data: dashboard,
            sale:sale_summary_by_month,
            message: "success",
            error: false
        })
    }
    catch (err) {
        logErr("dashboard.getlist", err, res);
    }
}
