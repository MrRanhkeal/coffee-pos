import { Button, Input, InputNumber, Select, Empty } from 'antd';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
// import { QRCodeSVG } from 'qrcode.react';
import BillItem from '../BillItem';
import styles from './CartView.module.css';
import MyQRCode from '../../../assets/myqr.jpg';

// Define the keyframes
const redPulse = keyframes`
    0% {
        color: #666;
    }
    50% {
        color: red;
    }
    100% {
        color: #666;
    }
    `;
    // Create a styled div with the animation
    const PulsingText = styled.div`
    font-size: 14px;
    color: #666;
    animation: ${redPulse} 1.5s infinite; /* Use the keyframes variable */
    `;
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

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartHeader}>
                <h2 className={styles.cartTitle}>
                    Cart <span>({state.cart_list.length})</span>
                </h2>
                {state.cart_list.length > 0 && (
                    <div
                        className={styles.clearButton}
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </div>
                )}
            </div> 
            <div className={styles.cartList}>
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
            <div className={styles.cartSummary}>
                <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>${objSummary.sub_total.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span>Items</span>
                    <span>{objSummary.total_qty}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span>Discount</span>
                    <span>-${objSummary.save_discount.toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.total}`}>
                    <span>Total</span>
                    <span>${objSummary.total.toFixed(2)}</span>
                </div>
            </div> 
            <div className={styles.cartCheckout}>
                <div style={{ marginBottom: '1rem' }}>
                    <div className={styles.inputLabel}>
                        <label>Customer</label>
                    </div>
                    <Select
                        style={{ width: '100%' }}
                        value={objSummary.customer_id || 'Select Customer'}
                        onChange={(value) => setObjSummary(prev => ({ ...prev, customer_id: value }))}
                        options={customers}
                    />
                </div> 
                <div style={{ marginBottom: '1rem' }}>
                    <div className={styles.inputLabel}>
                        <label>Payment Method</label>
                    </div>
                    <Select
                        style={{ width: '100%' }}
                        value={objSummary.payment_method || 'Payment Method'}
                        onChange={(value) => setObjSummary(prev => ({ ...prev, payment_method: value }))}
                        options={[
                            { value: 'cash', label: 'Cash' },
                            { value: 'QR', label: 'QR Code' },
                        ]}
                    />
                </div> 
                {objSummary.payment_method === 'QR' && (
                    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        <div className={styles.inputLabel}>
                            <label>Scan QR Code to Pay</label>
                        </div>
                        <div style={{
                            padding: '2px',
                            backgroundColor: "rgb(240, 241, 240)",
                            borderRadius: '8px',
                            border: '1px solid #d9d9d9'
                        }}>
                            <div style={{ display: 'flex' }}>
                                <img src={MyQRCode} alt="QR Code" style={{ width: '25%', height: 'auto' }} />
                                <div style={{
                                    marginTop: '10px',
                                    fontSize: '14px',
                                    color: '#666',
                                    fontWeight: 'bold'
                                }}>

                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#999',
                                    marginTop: '5px'
                                }}>
                                </div>
                                <div style={{ margin: '10% 10% 0 10%' }}>
                                    <PulsingText style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        Pay to this QR Code
                                        <br></br>
                                        Amount: ${objSummary.total.toFixed(2)}
                                    </PulsingText>
                                    <br></br>
                                    <PulsingText style={{ fontSize: '14px', color: '#666', animation: 'redPulse 1.5s infinite' }}>
                                        Scan with your mobile payment app
                                    </PulsingText>
                                </div>
                            </div>

                        </div>
                    </div>
                )} 
                <div style={{ marginBottom: '1rem' }}>
                    <div className={styles.inputLabel}>
                        <label>Remark</label>
                    </div>
                    <Input.TextArea
                        value={objSummary.remark}
                        onChange={(e) => setObjSummary(prev => ({ ...prev, remark: e.target.value }))}
                        placeholder="Add any special instructions"
                        autoSize={{ minRows: 1, maxRows: 2 }}
                    />
                </div> 
                <div style={{ marginBottom: '1rem' }}>
                    <div className={styles.inputLabel}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label>Amount Paid</label>
                            {objSummary.total_paid < objSummary.total && (
                                <span style={{ color: '#ff4d4f', fontSize: '12px' }}>
                                    Paid amount (${(objSummary.total - objSummary.total_paid).toFixed(2)} more needed)
                                </span>
                            )}
                        </div>
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
                    className={styles.checkoutButton}
                    disabled={state.cart_list.length === 0 || objSummary.total_paid < objSummary.total}
                >
                    Checkout
                </Button>
            </div>
        </div>
    )
} 
CartView.propTypes = {
    state: PropTypes.shape({
        cart_list: PropTypes.arrayOf(PropTypes.object).isRequired,
        loading: PropTypes.bool
    }).isRequired,
    objSummary: PropTypes.shape({
        sub_total: PropTypes.number,
        total_qty: PropTypes.number,
        save_discount: PropTypes.number,
        tax: PropTypes.number,
        total: PropTypes.number,
        total_paid: PropTypes.number,
        customer_id: PropTypes.string,
        payment_method: PropTypes.string,
        remark: PropTypes.string
    }).isRequired,
    customers: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    setObjSummary: PropTypes.func.isRequired,
    handleClearCart: PropTypes.func.isRequired,
    handleIncrease: PropTypes.func.isRequired,
    handleDescrease: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleClickOut: PropTypes.func.isRequired
};

export default CartView