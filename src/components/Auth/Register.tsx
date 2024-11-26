import styles from "./Register.module.css";
import { FormEvent, useState } from "react";
import { setRegisterData } from "src/slice/authSlice";
import { useDispatch, useSelector } from "src/utils/store";
import { registerThunk } from "src/slice/authSlice";
import { Navigate } from "react-router-dom";

export const Register = () => {
	const isRegistered = useSelector(state => state.auth.isRegistered)
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const handleRegister = (evt: FormEvent) => {
		evt.preventDefault();
			dispatch(registerThunk({email: email, login: login, password: password}));
			dispatch(setRegisterData({email:email, login:login, password:password})); // Передаём весь объект данных
	}
	if(isRegistered){
		return <Navigate to={'/login'}/>
	}
  return (
    <div className={styles.registerWrapper}>
      <form className={styles.registerForm}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Введите ваш Email" required />
        <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" name="login" placeholder="Введите ваш логин"  required/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Введите ваш пароль" required />
        <button type="submit" onClick={handleRegister} className={styles.registerButton}>Зарегистрироваться</button>
      </form>
    </div>
  );
};
