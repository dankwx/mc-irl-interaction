import { Header } from "../../components/Header";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.pageBody}>
      <Header />
      <div className={styles.bodyArea}>
        <h1>Página não encontrada :(</h1>
      </div>
    </div>
  );
}
