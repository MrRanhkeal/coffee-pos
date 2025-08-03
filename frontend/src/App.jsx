
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./page/auth/RegisterPage";
import MainLayout from "./component/layout/MainLayout";
import CustomerPage from "./page/customer/CustomerPage";
import CategoryPage from "./page/category/CategoryPage";
import RolePage from "./page/role/RolePage";
import SupplierPage from "./page/purchase/SupplierPage";
import UserPage from "./page/user/UserPage";
import ProductPage from "./page/product/ProductPage";
import ExpansePage from "./page/expanse/ExpansePage";
import PosPage from "./page/pos/PosPage";
import OrderPage from "./page/order/OrderPage";
import ReportSaleSummaryPage from "./page/report/ReportSaleSummaryPage";
import ReportExpenseSummaryPage from "./page/report/ReportExpenseSummaryPage";
import LoginPage from "./page/auth/LoginPage";
import ExchangePage from "./page/currency/ExchangePage";
import Dashboard from "./page/dashboard/Dashboard";
import ProtectedRoute from "./component/protects/ProtectedRoute";
// import Stock_CupPage from "./page/stock/Stock_CupPage";
// import Stock_CoffeePage from "./page/stock/Stock_CoffeePage";
import StockPage from "./page/stock/StockPage";
import ReportSalePage from "./page/report/ReportSalePage";
import SaleSummaryPage from "./page/report/SaleSummaryPage";
import ProductStock from "./page/stock/ProductStock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pos" element={<PosPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/order" element={<OrderPage />} /> 

          {/* blocked routes */}
          <Route path="/product" element={<ProtectedRoute permissionKey="product" element={<ProductPage />} />} />
          <Route path="/category" element={<ProtectedRoute permissionKey="category" element={<CategoryPage />} />} />
          <Route path="/supplier" element={<ProtectedRoute permissionKey="supplier" element={<SupplierPage />} />} />
          <Route path="/user" element={<ProtectedRoute permissionKey="user" element={<UserPage />} />} />
          <Route path="/role" element={<ProtectedRoute permissionKey="role" element={<RolePage />} />} />
          <Route path="/expanse" element={<ProtectedRoute permissionKey="expanse" element={<ExpansePage />} />} />
          <Route path="/stock" element={<ProtectedRoute permissionKey="stock" element={<StockPage />} />} />
          <Route path="/product_stock" element={<ProtectedRoute permissionKey="product_stock" element={<ProductStock />} />}/>
          {/* Stock related routes */}
          {/* <Route path="/stock-cup" element={<Stock_CupPage />} />
          <Route path="/stock-coffee" element={<Stock_CoffeePage />} /> */}

          <Route path="/currency" element={<ExchangePage />} />

          <Route
            path="/report_sale_summary"
            element={<ProtectedRoute permissionKey="report_sale_summary" element={<ReportSaleSummaryPage />} />}
          />
          <Route
            path="/report_expense_summary"
            element={<ProtectedRoute permissionKey="report_expense_summary" element={<ReportExpenseSummaryPage />} />}
          />
          <Route
            path="/sale_report"
            element={<ProtectedRoute permissionKey="sale_report" element={<ReportSalePage />} />}
          />
          <Route
            path="/get_sale_summary"
            element={<ProtectedRoute permissionKey="sale_month_report" element={<SaleSummaryPage />} />}
          />
          <Route path="*" element={<h1>404-Route Not Found!</h1>} />
        </Route>

        <Route>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
