import { FormEvent } from 'react'
import styles from './Login.module.css'
import { NavLink } from 'react-router-dom'

type Props = {
	login: string
	password: string
	error: string
	setLogin: (e: any) => void
	setPassword: (e: any) => void
	handleLogin: (evt:FormEvent) => void

}

export const LoginUI = ({login, password, error, setLogin, setPassword, handleLogin}: Props) => {
	return (
		<div className={styles.loginWrapper}>
		<form className={styles.loginForm}>
			<input value={login} onChange={e => setLogin(e.target.value)} type="text" name="login" placeholder="Введите ваш логин" />
			<input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Введите ваш пароль" />
			<span style={{color:'red'}}>{error}</span>
			<button type='submit' onClick={handleLogin} className={styles.loginButton}>Войти</button>
		</form>
		Еще не зарегистрированы? <NavLink to={'/register'} className={styles.toRegisterButton}>Зарегистрироваться</NavLink>
	</div>
	)
}