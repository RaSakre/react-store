import shop from "../../images/images.png";
import basket from "../../images/basket.svg";
import styles from "./Header.module.css";
import {  NavLink } from "react-router-dom";
import { useSelector } from "src/utils/store";

export const Header = () => {
	const basketProducts = useSelector(state => state.webStore.basketProducts)
	const login = useSelector(state => state.auth.userInfo.name)
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <NavLink to={'/'}>
          <img className={styles.logo} src={shop} alt="" />
        </NavLink>

        <nav>
          <ul className={styles.headerMenu}>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                className={styles.link}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop"}
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                className={styles.link}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                className={styles.link}
              >
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.headerButtons}>
          <NavLink to={'/basket'} className={basketProducts.length === 0 ? '' : styles.basketLink} >
						<p>{basketProducts.length === 0 ? '' : basketProducts.length}</p>
            <img src={basket} alt="" />
          </NavLink>
					{login ? <NavLink className={styles.headerLogin} to={'/profile'}>{login}</NavLink> : <NavLink to={'/login'} className={styles.headerLogin}>Войти</NavLink> }
        </div>
				
      </div>
    </header>
  );
};
