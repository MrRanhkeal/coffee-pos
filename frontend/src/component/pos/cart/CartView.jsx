import { Button, Input, InputNumber, Select, Empty } from 'antd';
import PropTypes from 'prop-types';
// import styled, { keyframes } from 'styled-components'; 
import BillItem from '../BillItem'; 
import MyQRCode from '../../../assets/myqr.jpg';

// Define the keyframes
const redPulse = {
    animation: 'redPulse 1.5s infinite',
    fontSize: '14px',
    color: '#666'
};

// Add keyframes for redPulse animation in a style tag
const RedPulseKeyframes = () => (
    <style>
        {`
        @keyframes redPulse {
            0% { color: #666; }
            50% { color: red; }
            100% { color: #666; }
        }
        `}
    </style>
);

function CartView({
    customers,
    state,
    objSummary,
    setObjSummary,
    handleClearCart,
    handleIncrease,
    handleDescrease,
    handleRemove,
    handleClickOut
}) {
    // Auto scale: adjust maxHeight based on cart items
    const baseHeight = 520;
    const itemHeight = 56;
    const maxHeight = Math.max(baseHeight, 260 + state.cart_list.length * itemHeight);

    return (
        <div style={{width: '100%',height: '100%',margin: '0', padding: '0', backgroundColor: '#fff', borderRadius: '8px'}}>
            <RedPulseKeyframes />
            <div style={{
                background: '#fff', 
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)', 
                padding: '2px',
                maxWidth: '100%',
                width: '100%',
                height: '100%',
                // maxHeight: '100%',
                position: 'relative',
                margin: '0 auto',
                transition: 'max-height 0.3s',
                maxHeight: maxHeight,
                overflowY: 'auto'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h2 style={{ fontWeight: 'bold', fontSize: '20px', margin: 0 }}>
                        Cart <span style={{ fontWeight: 'normal', fontSize: '16px' }}>({state.cart_list.length})</span>
                    </h2>
                    {state.cart_list.length > 0 && (
                        <Button
                            danger
                            size="small"
                            onClick={handleClearCart}
                            style={{ marginLeft: '8px' }}
                        >
                            Clear Cart
                        </Button>
                    )}
                </div>
                <div style={{ minHeight: '120px', marginBottom: '16px' }}>
                    {state.cart_list.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span style={{ color: '#595959' }}>
                                    Cart is empty
                                </span>
                            }
                        />
                    ) : (
                        state.cart_list.map((item, index) => (
                            <BillItem
                                key={index}
                                item={item}
                                handleIncrease={() => handleIncrease(item, index)}
                                handleDescrease={() => handleDescrease(item, index)}
                                handleRemove={() => handleRemove(item)}
                            />
                        ))
                    )}
                </div>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Subtotal</span>
                        <span>${objSummary.sub_total.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Items</span>
                        <span>{objSummary.total_qty}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Discount</span>
                        <span>-${objSummary.save_discount.toFixed(2)}</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: '#1890ff'
                    }}>
                        <span>Total</span>
                        <span>${objSummary.total.toFixed(2)}</span>
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Customer</label>
                        <Select
                            style={{ width: '100%' }}
                            value={objSummary.customer_id || undefined}
                            placeholder="Select Customer"
                            onChange={(value) => setObjSummary(prev => ({ ...prev, customer_id: value }))}
                            options={customers}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Payment Method</label>
                        <Select
                            style={{ width: '100%' }}
                            value={objSummary.payment_method || undefined}
                            placeholder="Payment Method"
                            onChange={(value) => setObjSummary(prev => ({ ...prev, payment_method: value }))}
                            options={[
                                { value: 'cash', label: 'Cash' },
                                { value: 'QR', label: 'QR Code' },
                            ]}
                        />
                    </div>
                    {objSummary.payment_method === 'QR' && (
                        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Scan QR Code to Pay</label>
                            <div style={{
                                padding: '2px',
                                backgroundColor: "rgb(240, 241, 240)",
                                borderRadius: '8px',
                                border: '1px solid #d9d9d9',
                                display: 'inline-block'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={MyQRCode} alt="QR Code" style={{ width: '25%', height: 'auto'}} />
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ ...redPulse, fontSize: '16px', fontWeight: 'bold',margin: '10% 10% 0 10%' }}>
                                            Pay to this QR Code
                                            <br />
                                            Amount: ${objSummary.total.toFixed(2)}
                                        </div>
                                        <div style={{ ...redPulse, fontSize: '14px', marginTop: '8px' }}>
                                            Scan with your mobile payment app
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Remark</label>
                        <Input.TextArea
                            value={objSummary.remark}
                            onChange={(e) => setObjSummary(prev => ({ ...prev, remark: e.target.value }))}
                            placeholder="Add any special instructions"
                            autoSize={{ minRows: 1, maxRows: 2 }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ fontWeight: 'bold' }}>Amount Paid</label>
                            {objSummary.total_paid < objSummary.total && (
                                <span style={{ color: '#ff4d4f', fontSize: '12px' }}>
                                    Paid amount (${(objSummary.total - objSummary.total_paid).toFixed(2)} more needed)
                                </span>
                            )}
                        </div>
                        <InputNumber
                            style={{ width: '100%' }}
                            value={objSummary.total_paid}
                            onChange={(value) => setObjSummary(prev => ({ ...prev, total_paid: value }))}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            min={0}
                            step={0.5}
                        />
                    </div>
                    <Button
                        onClick={handleClickOut}
                        type="primary"
                        style={{
                            width: '100%',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 10,
                            marginTop: '8px'
                        }}
                        disabled={state.cart_list.length === 0 || objSummary.total_paid < objSummary.total}
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}
CartView.propTypes = {
    customers: PropTypes.array.isRequired,
    state: PropTypes.object.isRequired,
    objSummary: PropTypes.object.isRequired,
    setObjSummary: PropTypes.func.isRequired,
    handleClearCart: PropTypes.func.isRequired,
    handleIncrease: PropTypes.func.isRequired,
    handleDescrease: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleClickOut: PropTypes.func.isRequired
};

export default CartView