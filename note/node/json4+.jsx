import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd'; // Assuming you're using Ant Design

function json4Plus() {
    // State to hold the data fetched from your API
    const [config, setConfig] = useState({ categories: [], brand_name: {} });
    // State to hold the currently selected category
    const [selectedCategory, setSelectedCategory] = useState(null);
    // State for the brands to be displayed in the dropdown
    const [filteredBrands, setFilteredBrands] = useState([]);

    // Simulating fetching data from the API
    useEffect(() => {
        // This would be your API call
        const fetchData = async () => {
            // Replace with your actual API call
            const response = {
                categories: [
                    { label: "Arabia_Coffee", value: "Arabia_Coffee", country: "vn" },
                    { label: "Amazon_Coffee", value: "Amazon_Coffee", country: "th" },
                    { label: "Bodia_Tea", value: "Bodia_Tea", country: "kh" },
                    { label: "ChaTraMue_Tea", value: "ChaTraMue_Tea", country: "th" },
                    { label: "Soda", value: "Soda", country: "kh" },
                ],
                brand_name: {
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
                }
            };
            setConfig(response);
        };

        fetchData();
    }, []);

    // Effect to update filtered brands whenever the selected category changes
    useEffect(() => {
        if (selectedCategory && config.brand_name[selectedCategory]) {
            setFilteredBrands(config.brand_name[selectedCategory]);
        } else {
            setFilteredBrands([]);
        }
    }, [selectedCategory, config.brand_name]);

    // ... rest of the component
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
                        // Update the selected category state
                        setSelectedCategory(value);

                        // This is how you would update the form field to clear the brand_name field
                        // if you are using antd's Form instance.
                        // form.setFieldsValue({ all_brand_name: null });

                        // Your existing logic
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
                    // Use the filteredBrands state to render the options
                    options={filteredBrands.map((opt) => ({
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

export default json4Plus;