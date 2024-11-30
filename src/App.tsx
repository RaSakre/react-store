import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { MainSection } from "./components/Main-Section/MainSection";
import { useDispatch, useSelector } from "./utils/store";
import { fetchClothes, fetchBasket } from "./slice/storeSlice";
import { Routes, Route } from "react-router-dom";
import { Shop } from "./components/Shop/Shop";
import { Card } from "./components/CardDetails/Card";
import { Basket } from "./components/Basket/Basket";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { Profile } from "./components/Profile/Profile";
import { restoreUser } from "./slice/authSlice";

function App() {
  const dispatch = useDispatch();
  const clothes = useSelector((state) => state.webStore.clothes);
  useEffect(() => {
    if (clothes.length === 0) {
      dispatch(fetchClothes());
    }
    dispatch(fetchBasket());
  }, [dispatch, clothes.length]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const userInfo = {
        email: localStorage.getItem("userEmail") as string,
        login: localStorage.getItem("userName") as string,
      };

      dispatch(restoreUser(userInfo));
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Card />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
