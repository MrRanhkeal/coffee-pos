//import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import MainLayoutAuth from './components/layout/MainLayoutAuth';
import HomePage from './page/home/HomePage';
import CategoryPage from './page/category/CategoryPage';
import LoginPage from './page/auth/LoginPage';
import RegisterPage from './page/auth/RegisterPage';
import CustomerPage from './page/customer/CustomerPage';
import DashboardPage from './page/dashboard/DashboardPage';
import EmployeePage from './page/employee/EmployeePage';
import ExchangPage from './page/exchange/ExchangPage';
import OrderPage from './page/order/OrderPage';
import ProductPage from './page/product/ProductPage';
import ReportPage from './page/report/ReportPage';
import RolePage from './page/role/RolePage';
import UserPage from './page/user/UserPage';
import SettngPage from './page/setting/SettngPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/exchange" element={<ExchangPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/role" element={<RolePage />} />
          <Route path="/setting" element={<SettngPage />} />

          <Route path="*" element={<h1>404-Page not found...!</h1>} />
        </Route>
        <Route element={<MainLayoutAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
      
    </BrowserRouter>

  )
}

export default App



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

//function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

//export default App
