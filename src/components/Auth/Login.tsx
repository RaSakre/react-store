import { NavLink } from 'react-router-dom'
import styles from './Login.module.css'
import { userThunk, setLoginData } from 'src/slice/authSlice'
import { useDispatch, useSelector } from 'src/utils/store'
import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'

export const Login = () => {
	const isAuth = useSelector(state => state.auth.isAuth)
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const handleLogin = (evt:FormEvent) => {
		evt.preventDefault()
		dispatch(setLoginData({login, password}))
		dispatch(userThunk({login, password}))
	}
	if(isAuth){
			return <Navigate to={'/'}/>
	}
	return (
		<div className={styles.loginWrapper}>
			<form className={styles.loginForm}>
				<input value={login} onChange={e => setLogin(e.target.value)} type="text" name="login" placeholder="Введите ваш логин" />
				<input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Введите ваш пароль" />
				<button type='submit' onClick={handleLogin} className={styles.loginButton}>Войти</button>
			</form>
			Еще не зарегистрированы? <NavLink to={'/register'} className={styles.toRegisterButton}>Зарегистрироваться</NavLink>
		</div>
	)
}