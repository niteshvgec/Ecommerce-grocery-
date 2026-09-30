import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets.js";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  // =========================
  // Fetch Seller
  // =========================

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");

      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // Fetch User
  // =========================

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // Fetch Products
  // =========================

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // Add To Cart
  // =========================

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {});

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);

    toast.success("Added to cart");
  };

  // =========================
  // Update Cart Item
  // =========================

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId] = quantity;

    setCartItems(cartData);

    toast.success("Cart updated");
  };

  // =========================
  // Remove Completely
  // =========================

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    // delete cartData[itemId];

    setCartItems(cartData);

    toast.success("Removed from cart");
  };

  // =========================
  // Remove  Item from cart
  // =========================
  const deleteItem = (itemId) => {
    const cartData = structuredClone(cartItems);

    delete cartData[itemId];

    setCartItems(cartData);

    toast.success("delete from cart");
  };

  // =========================
  // Total Cart Items
  // =========================

  const cartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      totalCount += cartItems[item];
    }

    return totalCount;
  };

  // =========================
  // Total Cart Amount
  // =========================

  const totalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === item);

      if (cartItems[item] > 0 && itemInfo) {
        totalAmount += cartItems[item] * itemInfo.offerPrice;
      }
    }

    return Math.floor(totalAmount * 1000) / 100;
  };

  // =========================
  // Update Cart in Backend
  // =========================

  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems, user]);

  // =========================
  // Initial Fetch
  // =========================

  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  // =========================
  // Context Value
  // =========================

  const value = {
    navigate,

    user,
    setUser,

    isSeller,
    setIsSeller,

    showUserLogin,
    setShowUserLogin,

    products,
    setProducts,

    addToCart,
    updateCartItem,
    removeFromCart,
    deleteItem,

    cartCount,
    cartItems,
    setCartItems,

    totalCartAmount,

    setSearchQuery,
    searchQuery,

    axios,

    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// =========================
// Custom Hook
// =========================

export const useAppContext = () => {
  return useContext(AppContext);
};
