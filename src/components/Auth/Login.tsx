import { LoginUI } from "./LoginUI";
import { userThunk, setLoginData } from "src/slice/authSlice";
import { useDispatch, useSelector } from "src/utils/store";
import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(setLoginData({ login, password }));
    try {
      await dispatch(userThunk({ login, password })).unwrap();
      console.log("Успешный вход");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Неверный логин или пароль");
    }
  };
  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <LoginUI
      login={login}
      setPassword={setPassword}
      setLogin={setLogin}
      error={error}
      password={password}
      handleLogin={handleLogin}
    />
  );
};
