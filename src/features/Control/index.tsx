import { Header } from "../../components/Header";
import styles from "./Control.module.scss";

export default function Control() {
  return (
    <div className={styles.ControlBody}>
      <Header />
      <div className={styles.switchArea}>
        <h1>Função de Controle de Casa será implementada em breve...</h1>
      </div>
    </div>
  );
}
