import React, { useCallback, useEffect, useState } from "react";
import {
    Button,
    Col,
    Empty,
    Input,
    InputNumber,
    message,
    notification,
    Row,
    Select,
    Space,
    Card,
    Typography
} from "antd";
import MainPage from "../../component/layout/MainPage";
import { configStore } from "../../store/configStore";
import ProductItem from "../../component/pos/ProductItem";
import BillItem from "../../component/pos/BillItem";
import styles from "./PosPage.module.css";
import { useReactToPrint } from "react-to-print";
import PrintInvoice from "../../component/pos/PrintInvoice";
import { request } from "../../util/helper";
import { getProfile } from "../../store/profile.store";
// import { request } from "../../util/helper";

function PosPage() {
    const { Text } = Typography;

    const { config } = configStore();
    const profile = getProfile();
    const refInvoice = React.useRef(null);

    const [state, setState] = useState({
        list: [],
        total: 0,
        loading: false,
        visibleModal: false,
        cart_list: [],
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
        brand: "",

    });

    const categories = [
        { id: "", name: "All", icon: "🛒" },
        { id: "Coffee", name: "Coffee", icon: "☕" },
        { id: "tea", name: "Tea", icon: "🍵" },
        { id: "smoothie", name: "Smoothie", icon: "🧋" },
        { id: "juice", name: "Juice", icon: "🥤" },
        { id: "coconut", name: "Coconut", icon: "🥥" },
        { id: "soda", name: "Soda", icon: "🍌" },
        { id: "fruit", name: "Fruit", icon: "🍎" },
        { id: "snack", name: "Snack", icon: "🍕" },
        // { id: "cream", name: "Cream", icon: "🍦" }
    ];

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
                row.barcode === item.barcode && row.sugarLevel === sugarLevel
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
        const param = {
            ...filter,
            page: refPage.current,
            is_list_all: 1,
        };
        setState(pre => ({ ...pre, loading: true }));
        try {
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
            console.error('Error fetching products:', error);
            setState(pre => ({ ...pre, loading: false }));
        }
    }, [filter, handleAdd]);

    useEffect(() => {
        getList();
    }, [getList]);

    const onFilter = () => {
        getList();
    };


    const handleClearCart = () => {
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
    };

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
            (item1) => item1.barcode != item.barcode
        );
        setState((p) => ({
            ...p,
            cart_list: new_list,
        }));
        handleCalSummary();
    };


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
    }, []);

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
            <Row gutter={24}>
                <Col span={16} className={styles.grid1}>
                    <div className="pageHeader">
                        <Space>
                            {/* <div>Product {state.total}</div>
                            <Input.Search
                                onChange={(event) =>
                                    setFilter((p) => ({ ...p, txt_search: event.target.value }))
                                }
                                allowClear
                                placeholder="Search"
                                onSearch={() => getList()}
                            />
                            <Select
                                allowClear
                                style={{ width: 130 }}
                                placeholder="Category"
                                options={config.category}
                                onChange={(id) => {
                                    setFilter((pre) => ({ ...pre, category_id: id }));
                                }}
                            />
                            <Select
                                allowClear
                                style={{ width: 130 }}
                                placeholder="Brand"
                                options={config.brand}
                                onChange={(id) => {
                                    setFilter((pre) => ({ ...pre, brand: id }));
                                }}
                            /> */}
                            {/* <Button onClick={onFilter} type="primary">
                                Search
                            </Button> */}
                        </Space>

                        <Space >
                            {/* <div>Category</div> */}
                            <div style={{ overflowX: 'auto', paddingBottom: 20, display: 'flex', gap: 8 }}>
                                {categories.map((category) => {
                                    const isSelected = String(filter.category_id) === String(category.id);

                                    return (
                                        <Card
                                            key={category.id}
                                            hoverable
                                            size="small"
                                            onClick={() => setFilter((prev) => ({ ...prev, category_id: category.id }))}
                                            style={{
                                                minWidth: 90,
                                                textAlign: 'center',
                                                backgroundColor: isSelected ? '#fff176' : '#f5f5f5',
                                                border: isSelected ? '1px solid #ffd700' : '1px solid transparent',
                                                borderRadius: 8,
                                                cursor: 'pointer'
                                            }}
                                            bodyStyle={{ padding: 12 }}
                                        >
                                            <Space direction="vertical" size={4} align="center">
                                                <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>{category.icon}</div>
                                                <Text
                                                    style={{ fontWeight: isSelected ? 600 : 400, fontSize: 12 }}
                                                >
                                                    {category.name}
                                                </Text>
                                            </Space>
                                        </Card>
                                    );
                                })}
                            </div>

                        </Space>
                    </div>
                    <Row gutter={[16, 16]}>
                        {state.list.map((item, index) => (
                            <Col key={index} span={8}>
                                <ProductItem {...item} handleAdd={handleAdd} />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col span={8}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>Items {state.cart_list.length}</div>
                        <Button onClick={handleClearCart}>Clear</Button>
                    </div>
                    {state.cart_list?.map((item, index) => (
                        <BillItem
                            key={index}
                            {...item}
                            handleIncrease={() => handleIncrease(item, index)}
                            handleDescrease={() => handleDescrease(item, index)}
                            handleRemove={() => handleRemove(item, index)}
                        />
                    ))}
                    {!state.cart_list.length && <Empty />}
                    <div>
                        <div className={styles.rowSummary}>
                            <div>Total Qty </div>
                            <div>{objSummary.total_qty}&nbsp;&nbsp;Item</div>
                        </div>
                        <div className={styles.rowSummary}>
                            <div>Sub total </div>
                            <div>{objSummary.sub_total}&nbsp;$</div>
                        </div>
                        <div className={styles.rowSummary}>
                            <div>Save($) </div>
                            <div>{objSummary.save_discount}&nbsp;$</div>
                        </div>
                        <div className={styles.rowSummary}>
                            <div style={{ fontWeight: "bold" }}>Total </div>
                            <div style={{ fontWeight: "bold" }}>{objSummary.total}&nbsp;$</div>
                        </div>
                    </div>
                    <div>
                        <Row gutter={[6, 6]} style={{ marginTop: 15 }}>
                            <Col span={12}>
                                {/* <Select
                                style={{ width: "100%" }}
                                placeholder="Select Customer"
                                options={(config?.customer || []).map(cust => ({
                                    label: cust.name, // or cust.fullName or cust.whatever is correct
                                    value: cust.id,   // or cust.customer_id depending on your data
                                }))}
                                onSelect={(value) => {
                                    setObjSummary((p) => ({
                                    ...p,
                                    customer_id: value,
                                    }));
                                }}
                                /> */}

                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="Select Customer"
                                    options={config?.customer}
                                    onSelect={(value) => {
                                        setObjSummary((p) => ({
                                            ...p,
                                            customer_id: value
                                        }));
                                    }}
                                />
                                {/* <Select
                                    style={{ width: "100%" }}
                                    placeholder="Select Customer"
                                    options={(config?.customer || []).map(cust => ({
                                        label: cust.name,
                                        value: cust.name,
                                    }))}
                                    onSelect={(value) => {
                                        setObjSummary((p) => ({
                                            ...p,
                                            customer_name: value,
                                        }));
                                    }}
                                /> */}
                            </Col>
                            <Col span={12}>
                                <Select
                                    style={{ width: "100%" }}
                                    placeholder="Select Payment"
                                    options={[
                                        {
                                            label: "Cash",
                                            value: "Cash",
                                        },
                                        {
                                            label: "ABA",
                                            value: "ABA",
                                        },
                                        {
                                            label: "Acleda",
                                            value: "Acleda",
                                        },
                                    ]}
                                    onSelect={(value) => {
                                        setObjSummary((p) => ({
                                            ...p,
                                            payment_method: value,
                                        }));
                                    }}
                                />
                            </Col>

                            <Col span={24}>
                                <Input.TextArea
                                    placeholder="Remark"
                                    onChange={(e) => {
                                        setObjSummary((p) => ({ ...p, remark: e.target.value }));
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]} style={{ marginTop: 15 }}>
                            <Col span={12}>
                                <div>Amount to Paid</div>
                                <InputNumber
                                    style={{ width: "100%" }}
                                    placeholder="Amount to paid"
                                    value={objSummary.total_paid}
                                    onChange={(value) => {
                                        setObjSummary((p) => ({ ...p, total_paid: value }));
                                    }}
                                />
                            </Col>
                            <Col span={12}>
                                <div><br></br></div>
                                <Button
                                    disabled={state.cart_list.length == 0 || objSummary.total_paid < objSummary.total}
                                    block
                                    type="primary"
                                    onClick={handleClickOut}
                                >
                                    Checkout{" "}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </MainPage>
    );
}

export default PosPage;