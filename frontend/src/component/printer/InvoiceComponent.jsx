import React from "react";
import PropTypes from "prop-types";

const InvoiceComponent = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ width: "72mm", fontFamily: "monospace", fontSize: "12px" }}
  >
    <h2 style={{ textAlign: "center" }}>Store Name</h2>
    <p>Date: {new Date().toLocaleString()} </p>
    <hr />
    <p>Item 1 ......... $5.00</p>
    <p>Item 2 ......... $3.50</p>
    <hr />
    <p>Total: $8.50</p>
    <hr />
    <p style={{ textAlign: "center" }}>Thank you for your purchase!</p>
  </div>
));

//props
InvoiceComponent.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
};
InvoiceComponent.displayName = "InvoiceComponent";

export default InvoiceComponent;