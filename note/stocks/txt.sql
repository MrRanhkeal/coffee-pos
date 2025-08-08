

coffee_stock { items.qty } - order_detail { items.qty }

if(p.brand === o.brand && p.order_no === o.order_no && p.name === o.name) {
    qty = sum(items.qty);
}