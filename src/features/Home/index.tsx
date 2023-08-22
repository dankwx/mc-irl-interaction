import { Accordion, Card } from "react-bootstrap";
import { CustomToggle } from "../../components/CustomToggle";
import { useFetchData } from "../../hooks/useApi";
import { BauData } from "../../types/BauData";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Home.module.scss";

export default function Home() {
  const data = useFetchData<BauData[]>("http://localhost:3001/data");

  return (
    <div>
      <h1 className={styles.titulo}>Titulo</h1>
      {data ? (
        <Accordion>
          {data.map((bau, index) => (
            <Card key={bau.nome}>
              <Card.Header>
                <CustomToggle eventKey={index.toString()}>
                  {bau.nome} - ID: {bau.id}
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={index.toString()}>
                <Card.Body>
                  <ul>
                    {bau.itens.map((item) => (
                      <li key={item.nome}>
                        {item.nome}: {item.quantidade}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
