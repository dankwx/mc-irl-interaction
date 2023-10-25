import styles from "./Header.module.scss";
import chestIcon from "../../assets/chest-icon-two.png";
import switchIcon from "../../assets/light-switch-icon-two.png";
import Routes from "../../routes";
import { Link, Route } from "react-router-dom";
import Control from "../../features/Control";

export function Header() {
  return (
    <div className={styles.HeaderBody}>
      <div className={styles.navbarLeft}>
        <h1 className={styles.title}>Minecraft Control Hub</h1>
        <img
          src={chestIcon}
          alt=""
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <img
          src={switchIcon}
          alt=""
          onClick={() => {
            window.location.href = "/controle";
          }}
        />
      </div>
    </div>
  );
}
