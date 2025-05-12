import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PropTypes from "prop-types";
// Receipt Component for Printing
const Receipt = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      width: "80mm",
      padding: "10px",
      fontFamily: "monospace",
      fontSize: "12px",
    }}
  >
    <h2 style={{ textAlign: "center" }}>Coffee Shop</h2>
    <div>No001 | {new Date().toLocaleString()}</div>
    <div>
      Customer: <b>General</b>
    </div>
    <div>By: Raren Chan</div>
    <hr />
    <p>Macbook Pro M1 ......... $2000.00</p>
    <p>Macbook Pro M2 ......... $2200.00</p>
    <hr />
    <p>
      Total: <b>$4200.00</b>
    </p>
    <hr />
    <p style={{ textAlign: "center" }}>Thank you for your purchase!</p>
  </div>
));

const App = () => {
  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  return (
    <div>
      <button onClick={printFn}>Print</button>
      <Receipt ref={componentRef} />
    </div>
  );
};

// PropTypes for the Receipt component
Receipt.propTypes = {
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
Receipt.displayName = "Receipt";

export default App;
