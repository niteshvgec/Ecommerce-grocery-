import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { AppContext, useAppContext } from "./context/AppContext.jsx";
import Navbar from "./components/Navbar";
import MyOrders from "./pages/MyOrders";
import Auth from "./models/Auth";
import ProductCategory from "./pages/ProductCategory.jsx";
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products.jsx";
import AddAddress from "./pages/AddAddress.jsx";
import SellerLayout from "./pages/seller/SellerLayout.jsx";
import SellerLogin from "./components/seller/SellerLogin.jsx";
import Addproducts from "./pages/seller/Addproducts.jsx";
import Orders from "./pages/seller/Orders.jsx";
import ProductList from "./pages/seller/ProductList.jsx";

const App = () => {
  const { isSeller, showUserLogin } = useAppContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <div className=" text-default min-h-screen">
      {isSellerPath ? null : <Navbar></Navbar>}
      {showUserLogin ? <Auth></Auth> : null}
      <Toaster></Toaster>
      {/* <Navbar></Navbar> */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route
            path="/product/:category/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route
            path="/products/:category"
            element={<ProductCategory></ProductCategory>}
          ></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/my-orders" element={<MyOrders></MyOrders>}></Route>
          <Route
            path="/add-address"
            element={<AddAddress></AddAddress>}
          ></Route>

          <Route
            path="/seller"
            element={
              isSeller ? (
                <SellerLayout></SellerLayout>
              ) : (
                <SellerLogin></SellerLogin>
              )
            }
          >
            <Route
              path="add-product"
              element={isSeller ? <Addproducts></Addproducts> : null}
            ></Route>
            <Route
              path="product-list"
              element={isSeller ? <ProductList></ProductList> : null}
            ></Route>
            <Route
              path="orders"
              element={isSeller ? <Orders></Orders> : null}
            ></Route>
          </Route>
        </Routes>
      </div>

      {isSellerPath ? null : <Footer></Footer>}
    </div>
  );
};

export default App;
