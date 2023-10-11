import styles from "./Header.module.scss";
import chestIcon from "../../assets/chest-icon-two.png";
import switchIcon from "../../assets/light-switch-icon-two.png";
export function Header() {
  return (
    <div className={styles.HeaderBody}>
      <div className={styles.navbarLeft}>
        <h1 className={styles.title}>Minecraft Control Hub</h1>
        <img src={chestIcon} alt="" />
        <img src={switchIcon} alt="" />
      </div>
    </div>
  );
}
