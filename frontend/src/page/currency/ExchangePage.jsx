import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

function ExchangePage() {
    const [form] = Form.useForm();
    const [KHRValue, setKHRValue] = useState('');
    const [USDValue, setUSDValue] = useState('');

    // The exchange rate for USD to KHR.
    const USD_TO_KHR_RATE = 4000; // 1 USD = 4100 KHR 
    // Handle KHR input change
    const handleKHRChange = (e) => {
        const value = e.target.value;
        setKHRValue(value);
        if (value && !isNaN(value)) {
            const usd = parseFloat(value) / USD_TO_KHR_RATE;
            setUSDValue(usd ? usd.toFixed(4) : '');
            form.setFieldsValue({ usd: usd ? usd.toFixed(4) : '' });
        } else {
            setUSDValue('');
            form.setFieldsValue({ usd: '' });
        }
    }; 
    // Handle USD input change
    const handleUSDChange = (e) => {
        const value = e.target.value;
        setUSDValue(value);
        if (value && !isNaN(value)) {
            const khr = parseFloat(value) * USD_TO_KHR_RATE;
            setKHRValue(khr ? khr.toFixed(0) : '');
            form.setFieldsValue({ khr: khr ? khr.toFixed(0) : '' });
        } else {
            setKHRValue('');
            form.setFieldsValue({ khr: '' });
        }
    }; 
    // Reset form fields
    const handleReset = () => {
        setKHRValue('');
        setUSDValue('');
        form.resetFields();
    }; 
    return (
        <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
            <Col
                // xs={24} sm={16} md={12} lg={8}
                style={{ maxWidth: 600, width: '100%' }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #f0f1f2' }}
                >
                    <div style={{ alignContent: 'center', fontSize: 16 }}> ExchangePage</div>
                    <Form.Item
                        label="USD ($)"
                        name="usd"
                        rules={[{ pattern: /^\d*(\.\d{0,4})?$/, message: 'Please enter a valid number' }]}
                    >
                        <Input
                            value={USDValue}
                            onChange={handleUSDChange}
                            placeholder="Enter USD amount"
                            prefix="$"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        label="KHR (៛)"
                        name="khr"
                        rules={[{ pattern: /^\d*$/, message: 'Please enter a valid number' }]}
                    >
                        <Input
                            value={KHRValue}
                            onChange={handleKHRChange}
                            placeholder="Enter KHR amount"
                            suffix="៛"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Row justify="space-between">
                        <Col>
                            <Button onClick={handleReset} icon={<ReloadOutlined />} type="default">
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}

export default ExchangePage;