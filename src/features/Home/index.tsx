import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.titulo}>Titulo</h1>
      <p>Descricao</p>
    </div>
  );
}
