import { RegisterUI } from "./RegisterUI";
import { FormEvent, useState } from "react";
import { setRegisterData } from "src/slice/authSlice";
import { useDispatch, useSelector } from "src/utils/store";
import { registerThunk } from "src/slice/authSlice";
import { Navigate } from "react-router-dom";

export const Register = () => {
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(registerThunk({ email: email, login: login, password: password }));
    dispatch(
      setRegisterData({ email: email, login: login, password: password })
    ); 
  };
  if (isRegistered) {
    return <Navigate to={"/login"} />;
  }
  return (
    <RegisterUI
      handleRegister={handleRegister}
      setEmail={setEmail}
      setPassword={setPassword}
      setLogin={setLogin}
      login={login}
      email={email}
      password={password}
    />
  );
};
