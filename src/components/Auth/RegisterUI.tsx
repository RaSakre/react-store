import { FormEvent } from 'react'
import styles  from './Register.module.css'

type Props = {
	email: string,
	setEmail: (e:any) => void,
	login: string,
	setLogin: (e:any) => void,
	password: string,
	setPassword: (e:any) => void,
	handleRegister: (e:FormEvent) => void,

}

export const RegisterUI = ({email, setEmail, login, setLogin, password, setPassword, handleRegister}: Props) => {
	return (
		<div className={styles.registerWrapper}>
		<form className={styles.registerForm}>
			<input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Введите ваш Email" required />
			<input value={login} onChange={(e) => setLogin(e.target.value)} type="text" name="login" placeholder="Введите ваш логин"  required/>
			<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Введите ваш пароль" required />
			<button type="submit" onClick={handleRegister} className={styles.registerButton}>Зарегистрироваться</button>
		</form>
	</div>
	)
}