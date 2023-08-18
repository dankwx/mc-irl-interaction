import styles from "./Home.module.scss";
import { useFetchData } from "../../hooks/useApi";
import { useState } from "react";

interface BauData {
  [key: string]: string[];
}

export default function Home() {
  const [selectedBau, setSelectedBau] = useState<string | null>(null);
  const data = useFetchData<BauData>("http://localhost:3001/data");

  const handleBauClick = (bau: string) => {
    setSelectedBau(bau);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.titulo}>Titulo</h1>
      {data ? (
        <>
          <ul>
            {Object.keys(data).map((bau) => (
              <li key={bau} onClick={() => handleBauClick(bau)}>
                {bau}
              </li>
            ))}
          </ul>
          {selectedBau && Array.isArray(data[selectedBau]) && (
            <>
              <h2>Items in {selectedBau}:</h2>
              <ul>
                {data[selectedBau].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
