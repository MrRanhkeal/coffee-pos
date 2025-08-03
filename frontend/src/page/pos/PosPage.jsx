import React, { useCallback, useEffect, useState } from "react";
import { Col, message, notification, Row, Space, Card, Typography, Input, Empty, Button, Flex } from "antd";
import MainPage from "../../component/layout/MainPage";
import ProductItem from "../../component/pos/ProductItem";
import CartView from "../../component/pos/cart/CartView";
import { useReactToPrint } from "react-to-print";
import PrintInvoice from "../../component/pos/PrintInvoice";
import { request } from "../../util/helper";
import { getProfile } from "../../store/profile.store";
import { FaSearch } from "react-icons/fa";

function PosPage() {
    const { Text } = Typography;


    const profile = getProfile();
    const refInvoice = React.useRef(null);

    const [state, setState] = useState({
        list: [],
        total: 0,
        loading: false,
        visibleModal: false,
        cart_list: [],
        customers: []
    });

    const [objSummary, setObjSummary] = useState({
        sub_total: 0,
        total_qty: 0,
        save_discount: 0,
        tax: 10,
        total: 0,
        total_paid: 0,
        customer_id: null,
        customer_name: null,
        payment_method: null,
        remark: '0',
        order_no: null, // set after order
        order_date: null, // set after order
    });

    const refPage = React.useRef(1);

    const [filter, setFilter] = useState({
        txt_search: "",
        category_id: "",
        category_name: "",
        brand: "",

    });

    const [categories, setCategories] = useState([
        { id: "", name: "All", icon: "🛒" }
    ]);

    const handleCalSummary = useCallback(() => {
        setState(currentState => {
            let total_qty = 0,
                sub_total = 0,
                save_discount = 0;

            currentState.cart_list.forEach((item) => {
                total_qty += item.cart_qty; //check that(-=1 from product_stock.qty)
                const original_total = Number(item.cart_qty) * Number(item.price);
                let final_price = original_total;

                if (item.discount != null && item.discount != 0) {
                    final_price = original_total - (original_total * Number(item.discount)) / 100;
                    save_discount += (original_total * Number(item.discount)) / 100;
                }
                sub_total += final_price;
            });

            setObjSummary(p => ({
                ...p,
                sub_total: Number(sub_total.toFixed(2)),
                total_qty: total_qty,
                save_discount: Number(save_discount.toFixed(2)),
                total: Number(sub_total.toFixed(2)),
                total_paid: p.total_paid || 0,
            }));

            return currentState;
        });
    }, []);

    const handleAdd = useCallback(({ sugarLevel, ...item }) => {
        setState(prevState => {
            const cart_tmp = [...prevState.cart_list];
            const findIndex = cart_tmp.findIndex((row) =>
                // row.sugarLevel === sugarLevel
                row.id === item.id && row.sugarLevel === sugarLevel
            );

            if (findIndex === -1) {
                cart_tmp.push({ ...item, sugarLevel, cart_qty: 1 });
            } else {
                cart_tmp[findIndex].cart_qty += 1;
            }
            return { ...prevState, cart_list: cart_tmp };
        });
        handleCalSummary();
    }, [handleCalSummary]);

    const getList = useCallback(async () => {
        try {
            setState(pre => ({ ...pre, loading: true }));
            const param = {
                ...filter,
                page: refPage.current,
                is_list_all: 1,
            };
            const res = await request("product", "get", param);
            if (res && !res.error) {
                if (res.list?.length === 1) {
                    const processedItem = {
                        ...res.list[0],
                        price: Number(res.list[0].price),
                        discount: Number(res.list[0].discount)
                    };
                    handleAdd(processedItem);
                    setState(pre => ({ ...pre, loading: false }));
                    return;
                }
                const processedList = res.list.map(item => ({
                    ...item,
                    price: Number(item.price),
                    discount: Number(item.discount)
                }));
                setState(pre => ({
                    ...pre,
                    list: processedList,
                    total: refPage.current === 1 ? res.total : pre.total,
                    loading: false,
                }));
            }
        } catch (error) {
            console.error('Error getting products:', error);
            setState(pre => ({ ...pre, loading: false }));
        }
    }, [filter, handleAdd]);

    const getCustomers = useCallback(async () => {
        const res = await request('customer', 'get');
        if (res && !res.error) {
            setState(prev => ({
                ...prev,
                customers: res.list.map(customer => ({
                    value: customer.id || 'walk-in',
                    label: customer.name || 'Customer 1',
                }))
            }));
        }
    }, []);

    const getCategories = useCallback(async () => {
        try {
            const res = await request('category', 'get');
            if (res && !res.error && res.list) {
                // Create category icons mapping
                const categoryIcons = {
                    'Coffee': '☕',
                    'Tea': '🍵',
                    'Coconut': '🥥',
                    'Soda': '🥤',
                    'Milk': '🥛',
                };

                const categoriesFromBackend = res.list.map(category => ({
                    id: category.id,
                    name: category.name,
                    icon: categoryIcons[category.name] || '📦'
                }));

                setCategories([
                    { id: "", name: "All", icon: "🛒" },
                    ...categoriesFromBackend
                ]);
            }
        } catch (error) {
            console.error('Error getting categories:', error);
            // Keep default "All" category if get fails
            setCategories([
                { id: "", name: "All", icon: "🛒" }
            ]);
        }
    }, []);

    useEffect(() => {
        getList();
    }, [getList]);

    useEffect(() => {
        getCustomers();
    }, [getCustomers]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    useEffect(() => {
        if (filter.category_id !== undefined) {
            getList();
        }
    }, [filter.category_id, getList]);

    const onFilter = () => {
        getList();
    };

    const handleClearCart = useCallback(() => {
        setState((p) => ({ ...p, cart_list: [] }));
        setObjSummary((p) => ({
            ...p,
            sub_total: 0,
            total_qty: 0,
            save_discount: 0,
            tax: 10,
            total: 0,
            total_paid: 0,
        }));
    }, []);

    const handleIncrease = (item, index) => {
        state.cart_list[index].cart_qty += 1;
        setState((p) => ({ ...p, cart_list: state.cart_list }));
        handleCalSummary();
    };

    const handleDescrease = (item, index) => {
        if (item.cart_qty > 1) {
            state.cart_list[index].cart_qty -= 1;
            setState((p) => ({ ...p, cart_list: state.cart_list }));
            handleCalSummary();
        }
    };

    const handleRemove = (item) => {
        const new_list = state.cart_list.filter(
            // (item1) => item1.barcode !== item.barcode
            (item1) => item1.id !== item.id || item1.sugarLevel !== item.sugarLevel
        );
        setState((p) => ({
            ...p,
            cart_list: new_list,
        }));
        handleCalSummary();
    };

    // const handleRemove = (item) => {
    //     const new_list = state.cart_list.filter(
    //         (item1) => item1.barcode !== item.barcode
    //     );
    //     setState((p) => ({
    //         ...p,
    //         cart_list: new_list,
    //     }));
    //     handleCalSummary();
    // };
    const handleClickOut = async () => {
        // Check if paid amount is sufficient
        if (objSummary.total_paid < objSummary.total) {
            notification.error({
                message: "Insufficient Payment",
                description: "Paid amount is not sufficient, please check again!",
                placement: "top",
                style: {
                    backgroundColor: "hsl(359,100%,98%)",
                    outline: "1px solid #ff4d4f",
                },
            });
            return;
        }

        try {
            // Prepare order details with complete item information
            const order_details = state.cart_list.map(item => ({
                product_id: item.id,
                product_name: item.name,
                qty: item.cart_qty,
                price: Number(item.price),
                discount: Number(item.discount || 0),
                total: Number((item.cart_qty * item.price * (1 - (item.discount || 0) / 100)).toFixed(2)),
                sugarLevel: item.sugarLevel
            }));

            const param = {
                order: {
                    total_amount: objSummary.total,
                    paid_amount: objSummary.total_paid,
                    total_qty: objSummary.total_qty,
                    save_discount: objSummary.save_discount,
                    customer_id: objSummary.customer_id || 'Guest',
                    customer_name: objSummary.customer_name || 'Guest',
                    payment_method: objSummary.payment_method || 'Cash',
                    remark: objSummary.remark || '',
                },
                order_details: order_details,
            };

            const res = await request("order", "post", param);

            if (res && !res.error) {
                message.success("Order completed successfully!");

                // Update order information for the invoice
                const invoiceData = {
                    ...objSummary,
                    order_no: res.order?.order_no,
                    order_date: res.order?.create_at
                };

                setObjSummary(invoiceData);

                // Print invoice first
                setTimeout(() => {
                    handlePrintInvoice();
                    // Clear cart only after printing
                    setTimeout(() => {
                        handleClearCart();
                        // Reset summary after clearing cart
                        setObjSummary({
                            sub_total: 0,
                            total_qty: 0,
                            save_discount: 0,
                            tax: 10,
                            total: 0,
                            total_paid: 0,
                            customer_id: null,
                            customer_name: null,
                            payment_method: null,
                            remark: '0',
                            order_no: null,
                            order_date: null,
                        });
                    }, 1000);
                }, 500);
            } else {
                throw new Error(res.error || 'Failed to complete order');
            }
        } catch (error) {
            notification.error({
                message: "Order Failed",
                description: error.message || "Failed to complete the order. Please try again.",
                placement: "top",
            });
        }
    };
    const onBeforePrint = React.useCallback(() => {
        console.log("`onBeforePrint` called");
        return Promise.resolve();
    }, []);

    const onAfterPrint = React.useCallback((event) => {
        handleClearCart();
        console.log("`onAfterPrint` called", event);
    }, [handleClearCart]);

    const onPrintError = React.useCallback(() => {
        console.log("`onPrintError` called");
    }, []);

    const handlePrintInvoice = useReactToPrint({
        contentRef: refInvoice,
        onBeforePrint: onBeforePrint,
        onAfterPrint: onAfterPrint,
        onPrintError: onPrintError,
    });

    return (
        <MainPage loading={state.loading}>
            <div style={{ display: "none" }}>
                <PrintInvoice
                    ref={refInvoice}
                    cart_list={state.cart_list}
                    objSummary={objSummary}
                    cashier={profile?.name || 'System'}
                />
            </div>
            {/* <Row gutter={24} style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}></Row> */}
            <Row gutter={24} style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
                <Col span={16} style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <Space >
                            {/* <Typography.Title level={3} style={{ margin: 0 }}>Products</Typography.Title> */}
                            <Flex>
                                <Input
                                    placeholder="Search products..."
                                    style={{ width: 250 }}
                                    onChange={(event) =>
                                        setFilter((prev) => ({
                                            ...prev,
                                            txt_search: event.target.value,
                                        }))
                                    }
                                    onSearch={onFilter}
                                />
                            </Flex>
                            <Button type="primary" onClick={onFilter}> 
                                <FaSearch /> Search
                            </Button>
                        </Space>

                        <div style={{ marginBottom: '1rem' }}>
                            <Typography.Title level={5} style={{ marginBottom: '1rem', color: '#595959' }}>Categories</Typography.Title>
                            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                {categories.map((category) => {
                                    {/* const isSelected = String(filter.category_name) === String(category.name); */ }
                                    const isSelected = category.id === filter.category_id;
                                    return (
                                        <Card
                                            key={category.name}
                                            hoverable
                                            size="small"
                                            onClick={() => {
                                                setFilter((prev) => ({
                                                    ...prev,
                                                    category_id: category.id,
                                                }));
                                                // Filtering will be triggered automatically by useEffect
                                            }}
                                            style={{
                                                minWidth: 90,
                                                textAlign: 'center',
                                                backgroundColor: isSelected ? '#e6f7ff' : '#ffffff',
                                                border: isSelected ? '1px solid #1890ff' : '1px solid #f0f0f0',
                                                borderRadius: 8,
                                                cursor: 'pointer',
                                                transition: 'all 0.3s'
                                            }}
                                            styles={{ body: { padding: 12 } }}
                                        >
                                            <Space direction="vertical" size={4} align="center">
                                                <div style={{ fontSize: '1.5rem', lineHeight: 1, color: isSelected ? '#1890ff' : '#595959' }}>{category.icon}</div>
                                                <Text style={{
                                                    fontWeight: isSelected ? 600 : 400,
                                                    fontSize: 12,
                                                    color: isSelected ? '#1890ff' : '#595959'
                                                }}>
                                                    {category.name}
                                                </Text>
                                            </Space>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        paddingRight: '12px',
                        marginRight: '-8px',
                        marginTop: '1rem'
                    }}>
                        <Row gutter={[16, 16]}>
                            {state.list.length === 0 ? (
                                <Col span={24} style={{ textAlign: 'center', padding: '32px' }}>
                                    <Empty
                                        description={
                                            <span style={{ color: '#595959' }}>
                                                No products found
                                            </span>
                                        }
                                    />
                                </Col>
                            ) : (
                                state.list.map((item, index) => (
                                    <Col key={index} span={8}>
                                        <ProductItem {...item} handleAdd={handleAdd} />
                                    </Col>
                                ))
                            )}
                        </Row>
                    </div>
                </Col>
                <Col span={8}>
                    <CartView
                        state={state}
                        objSummary={objSummary}
                        setObjSummary={setObjSummary}
                        customers={[
                            // { value: 'walk-in', label: 'Walk in customer' },
                            ...(state.customers || []).map(customer => ({
                                value: customer.id || customer.value,
                                label: customer.name || customer.label
                            }))
                        ]}
                        handleClearCart={handleClearCart}
                        handleIncrease={handleIncrease}
                        handleDescrease={handleDescrease}
                        handleRemove={handleRemove}
                        handleClickOut={handleClickOut}
                    />
                </Col>
            </Row>
        </MainPage>
    );
}

export default PosPage;