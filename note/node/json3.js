exports.getlist = async (req, res) => {
    try {
        const categories = [
            { label: "Arabia_Coffee", value: "Arabia_Coffee", country: "vn" },
            { label: "Amazon_Coffee", value: "Amazon_Coffee", country: "th" },
            { label: "Bodia_Tea", value: "Bodia_Tea", country: "kh" },
            { label: "ChaTraMue_Tea", value: "ChaTraMue_Tea", country: "th" },
            { label: "Soda", value: "Soda", country: "kh" },
        ];
        const brand_name = {
            Arabia_Coffee: [
                { label: "Ice Arabia Coffee", value: "Ice Arabia Coffee", country: "vn" },
                { label: "Hot Arabia Coffee", value: "Hot Arabia Coffee", country: "vn" },
            ],
            Amazon_Coffee: [
                { label: "Hot Amazon Coffee", value: "Hot Amazon Coffee", country: "th" },
                { label: "Ice Amazon Coffee", value: "Ice Amazon Coffee", country: "th" },
            ],
            Bodia_Tea: [
                { label: "Hot Bodia Tea", value: "Hot Bodia Tea", country: "kh" },
                { label: "Ice Bodia Tea", value: "Ice Bodia Tea", country: "kh" },
            ],
            ChaTraMue_Tea: [
                { label: "Hot ChaTraMue Tea", value: "Hot ChaTraMue Tea", country: "th" },
                { label: "Ice ChaTraMue Tea", value: "Ice ChaTraMue Tea", country: "th" },
            ],
            Soda: [
                { label: "Hot Soda", value: "Hot Soda", country: "kh" },
                { label: "Ice Soda", value: "Ice Soda", country: "kh" },
            ]
        };  

        res.json({
            categories,
            brand_name,
            message: "success"
        });

    } catch (error) {
        logErr("config.getlist", error, res);
    }
};