import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

function ExchangePage() {
    const [form] = Form.useForm();
    const [KHRValue, setKHRValue] = useState('');
    const [USDValue, setUSDValue] = useState('');
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&family=Roboto:wght@400;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => { document.head.removeChild(link); };
    }, []);
    // The exchange rate for USD to KHR.
    const USD_TO_KHR_RATE = 4000; // 1 USD = 4100 KHR 
    // Handle KHR input change
    const handleKHRChange = (e) => {
        const value = e.target.value;
        setKHRValue(value);
        if (value && !isNaN(value)) {
            const usd = parseFloat(value) / USD_TO_KHR_RATE;
            setUSDValue(usd ? usd.toFixed(2) : '');
            form.setFieldsValue({ usd: usd ? usd.toFixed(2) : '' });
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
            setKHRValue(khr ? khr.toFixed(2) : '');
            form.setFieldsValue({ khr: khr ? khr.toFixed(2) : '' });
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
        <div style={{ minHeight: '20%', background: '#ffffff', padding: 10, borderRadius: 8, boxShadow: '0 2px 8px #b5b1b1ff', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}><div style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold', fontSize: '24px', alignItems: 'center', justifyContent: 'center', display: 'flex', margin: '0 0 6px 0' }}>អត្រាប្ដូរប្រាក់</div>
            <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', margin: '0 0 10px 0' }}>ប្រាក់ដុល្លា (USD)</label><br />
                    <Input
                        style={{ width: '90%', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                        value={USDValue}
                        onChange={handleUSDChange}
                        placeholder="បញ្ចូលប្រាក់ដុល្លា"
                        className="khmer-search"
                        prefix="$"
                        autoComplete="off"

                    /><b>&nbsp;&nbsp;&nbsp;=</b>
                </div> 
                <div style={{ marginBottom: '1rem', marginLeft: '10px' }}>
                    <label style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', margin: '0 0 10px 0' }}>ប្រាក់រៀល (KHR)</label><br />
                    <Input
                        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', width: '90%' }}
                        value={KHRValue}
                        onChange={handleKHRChange}
                        placeholder="បញ្ចូលប្រាក់រៀល"
                        className="khmer-search"
                        suffix="៛"
                        autoComplete="off"
                    />
                </div>
            </div>
            <div>
                <Row justify="space-between">
                    <Col>
                        <Button onClick={handleReset} icon={<ReloadOutlined />} type="default" style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                            សម្អាត
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ExchangePage;