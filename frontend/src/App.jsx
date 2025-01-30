// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/home/HomePage';
import UserPage from './page/user/UserPage';
import CategoryPage from './page/category/CategoryPage';
import ProductPage from './page/product/ProductPage';
import LoginPage from './page/auth/LoginPage';
import RegisterPage from './page/auth/RegisterPage';
function App() {
  //const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/user' element={<UserPage/>}></Route>
          <Route path='/category' element={<CategoryPage/>}></Route>
          <Route path='/product' element={<ProductPage/>}></Route>
        </Route>
        <Route>
          <Route path='*' element={<h>Page Not Found</h>}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
