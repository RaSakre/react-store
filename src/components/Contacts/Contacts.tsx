import { Link } from "react-router-dom";
import tgIcon from "../../images/Telegram.png";
import styles from "./Contacts.module.css";

export const Contacts = () => {
  return (
    <div className={styles.contactsWrapper}>
      <div className={styles.icons}>
        <Link to={"https://github.com/RaSakre"}>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
            alt="Иконка GitHub"
            width={100}
            height={100}
          />
        </Link>
        <Link to={"https://t.me/sakre_e"}>
          <img src={tgIcon} alt="" width={100} height={100} />
        </Link>
      </div>
      <footer className={styles.footerRights}>
        <p>Низамов Ранэль 2024 © Все права защищены.</p>
      </footer>
    </div>
  );
};
