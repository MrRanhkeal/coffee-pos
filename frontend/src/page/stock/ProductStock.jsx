import React, { useEffect, useState } from 'react';
import { SpreadSheets, Worksheet, Column } from '@mescius/spread-sheets-react';
import { Button, message } from 'antd';
import { request } from '../../util/helper';
import { MdDownload } from 'react-icons/md';
// import {Product} from '../product/ProductPage'

function ProductStock() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [spread, setSpread] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await request('product', 'get', {});
            if (res && !res.error && res.list) {
                setData(res.list);
            } else {
                setData([]);
                message.info('No product data found.');
            }
        } catch (err) {
            message.error('Failed to get product data');
        } finally {
            setLoading(false);
        }
    };

    // Prepare spreadsheet data
    const columns = [
        { name: 'name', title: 'Product Name', width: 180 },
        { name: 'brand', title: 'Brand', width: 120 },
        { name: 'category_name', title: 'Category', width: 120 },
        { name: 'qty', title: 'Quantity', width: 100 },
        { name: 'price', title: 'Price', width: 100 },
        { name: 'discount', title: 'Discount (%)', width: 100 },
        { name: 'status', title: 'Status', width: 100 },
    ];

    // Map product data to spreadsheet rows
    const sheetData = data.map(item => [
        item.name,
        item.brand,
        item.category_name,
        item.qty,
        item.price,
        item.discount,
        item.status === 1 ? 'Active' : 'Inactive',
    ]);

    // Handle save (example: collect data from spreadsheet and send to backend)
    const handleSave = () => {
        if (!spread) return;
        const sheet = spread.getActiveSheet();
        const rowCount = sheet.getRowCount();
        const colCount = columns.length;
        const updated = [];
        for (let r = 0; r < rowCount; r++) {
            let row = {};
            for (let c = 0; c < colCount; c++) {
                row[columns[c].name] = sheet.getValue(r, c);
            }
            updated.push(row);
        }
        // Example: send updated to backend
        message.success('Collected data from spreadsheet. (Implement save logic)');
        // TODO: Implement backend update logic here
    };

    return (
        <div>
            <h2>Product Stock Spreadsheet</h2>
            <Button onClick={getData} loading={loading} style={{ marginBottom: 12 }}>Refresh</Button>
            <Button type="primary" onClick={handleSave} style={{ marginLeft: 8 }}>Save</Button>
            <div style={{ height: 500, marginTop: 16 }}>
                <SpreadSheets
                    allowOpen={true}
                    allowEdit={true}
                    allowExport={true}
                    allowSave={true}
                    workbookInitialized={spread => {
                        setSpread(spread);
                        // Set initial data
                        const sheet = spread.getActiveSheet();
                        sheet.setRowCount(Math.max(20, sheetData.length));
                        sheet.setColumnCount(columns.length);
                        columns.forEach((col, idx) => {
                            sheet.setColumnWidth(idx, col.width);
                            sheet.setValue(0, idx, col.title);
                        });
                        sheetData.forEach((row, rIdx) => {
                            row.forEach((val, cIdx) => {
                                sheet.setValue(rIdx + 1, cIdx, val);
                            });
                        });
                    }}
                    style={{ width: '100%', height: 480 }}
                >
                    <Worksheet />
                </SpreadSheets>
            </div>
        </div>
    );
}

export default ProductStock;