import styles from "./Home.module.scss";
import { useFetchData } from "../../hooks/useApi";

export default function Home() {
  const description = useFetchData("http://localhost:3001/data");

  return (
    <div className={styles.page}>
      <h1 className={styles.titulo}>Titulo</h1>
      {description ? <p>{description.message}</p> : <p>Loading...</p>}
    </div>
  );
}
