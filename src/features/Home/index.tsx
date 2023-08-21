import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { useFetchData } from "../../hooks/useApi";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Home.module.scss";

interface BauData {
  nome: string;
  itens: {
    nome: string;
    quantidade: number;
  }[];
}

function CustomToggle({
  children,
  eventKey,
}: {
  children: React.ReactNode;
  eventKey: string;
}) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <button type="button" onClick={decoratedOnClick}>
      {children}
    </button>
  );
}

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
                  {bau.nome}
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
        <p>Loading...</p>
      )}
    </div>
  );
}
