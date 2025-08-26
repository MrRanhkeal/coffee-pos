const { db, logErr, isArray, isEmpty } = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        const brand = [ 
            { label: "Arabia_Coffee", value: "Arabia_Coffee", country: "vn" },
            { label: "Amazon_Coffee", value: "Amazon_Coffee", country: "th" },
            { label: "Bodia_Tea", value: "Bodia_Tea", country: "kh" },
            { label: "ChaTraMue_Tea", value: "ChaTraMue_Tea", country: "th" },
            { label: "Soda", value: "Soda", country: "kh" }, 
        ];
        const categories = {
            Arabia_Coffee :[
                { label: "Ice Arabia Coffee", value: "Ice Arabia Coffee", country: "vn" },
                { label: "Hot Arabia Coffee", value: "Hot Arabia Coffee", country: "vn" }, 
            ],
            Amazon_Coffee :[
                { label: "Hot Amazon Coffee", value: "Hot Amazon Coffee", country: "th" },
                { label: "Ice Amazon Coffee", value: "Ice Amazon Coffee", country: "th" },
            ],
            Bodia_Tea:[
                { label: "Hot Bodia Tea", value: "Hot Bodia Tea", country: "kh" },
                { label: "Ice Bodia Tea", value: "Ice Bodia Tea", country: "kh" },
            ],
            ChaTraMue_Tea:[
                { label: "Hot ChaTraMue Tea", value: "Hot ChaTraMue Tea", country: "th" },
                { label: "Ice ChaTraMue Tea", value: "Ice ChaTraMue Tea", country: "th" },
            ],
            Soda :[
                { label: "Hot Soda", value: "Hot Soda", country: "kh" },
                { label: "Ice Soda", value: "Ice Soda", country: "kh" }, 
            ]
        }; 
        // const categories = [
        //     { label: "មណ្ឌលគិរី​កាហ្វេ", value: "មណ្ឌលគិរី​កាហ្វេ", country: "kh" },
        //     { label: "Arabia Coffee", value: "Arabia Coffee", country: "vn" },
        //     { label: "Amazon Coffee", value: "Amazon Coffee", country: "th" },
        //     { label: "Bodia Tea", value: "Bodia Tea", country: "kh" },
        //     { label: "ChaTraMue Tea", value: "ChaTraMue Tea", country: "th" },
        //     { label: "Soda", value: "Soda", country: "kh" },
        //     { label: "Milk", value: "Milk", country: "kh" },
        //     { label: "Coconut", value: "Coconut", country: "kh" },
        //     { label: "Test", value: "Test", country: "kh" },
        // ];

        // Create a Set of category values
        const categoryValues = new Set(categories.map(cat => cat.value));

        // Filter brand items to only include those in categories
        const brand_name = brand.filter(b => categoryValues.has(b.value));

        res.json({
            categories,
            brand_name,
            message: "success"
        });

    }
    catch (error) {
        logErr("config.getlist", error, res);
    }
};


//call to client side 
import { useEffect, useState } from 'react';
import axios from 'axios'; // or use fetch if preferred

const [config, setConfig] = useState({ categories: [], brand_name: [] });

useEffect(() => {
    const getConfig = async () => {
        try {
            const res = await axios.get('/api/config'); // adjust the path as needed
            setConfig(res.data);
        } catch (error) {
            console.error("Failed to get config:", error);
        }
    };

    getConfig();
}, []);


//
import React from 'react'

function json() {
    return (
        <div> 
            <Form.Item
                name="categories"
                label={
                    <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                        ប្រភេទទំនិញ
                    </span>
                }
                style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                rules={[{ required: true, message: 'សូមបញ្ចូលប្រភេទទំនិញ!' }]}
            >
                <Select
                    style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    placeholder="ជ្រើសរើសប្រភេទទំនិញ"
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    options={config.categories?.map((opt) => ({
                        value: opt.value,
                        label: (
                            <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                                {opt.label}
                            </span>
                        )
                    }))}
                    onChange={(value) => {
                        setFilter((prev) => ({
                            ...prev,
                            categories: value,
                        }));
                        getList();
                    }}
                    disabled={state.isReadOnly}
                />
            </Form.Item>
            <Form.Item
                name="all_brand_name"
                label={
                    <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                        ម៉ាកផលិតផល
                    </span>
                }
            >
                <Select
                    style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    placeholder="ជ្រើសរើសម៉ាកផលិតផល"
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    options={config.all_brand_name?.map((opt) => ({
                        value: opt.value,
                        label: (
                            <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                                {opt.label}
                            </span>
                        )
                    }))}
                />
            </Form.Item>
        </div>
    )
}

export default json




