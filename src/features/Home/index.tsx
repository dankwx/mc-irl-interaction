import { Accordion, Card, Modal } from "react-bootstrap";
import { CustomToggle } from "../../components/CustomToggle";
import { useFetchData } from "../../hooks/useApi";
import { BauData } from "../../types/BauData";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Home.module.scss";
import chest from "../../assets/chest.png";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBauId, setSelectedBauId] = useState<string | null>(null);
  const data = useFetchData<BauData[]>("http://localhost:3001/data");

  const handleChestClick = (bauId: string) => {
    setSelectedBauId(bauId);
    setShowModal(true);
  };

  const selectedBau = data?.find((bau) => bau.id === selectedBauId);

  return (
    <div>
      <h1 className={styles.titulo}>Titulo</h1>
      {data ? (
        <>
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

          <div className={styles.chestArea}>
            {data.map((bau) => (
              <div className={styles.singleChest} key={bau.id}>
                <h1>{bau.id}</h1>
                <img
                  src={chest}
                  className={styles.chest}
                  alt=""
                  onClick={() => handleChestClick(bau.id)}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}

      <Modal
        className={styles.modalPai}
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Titulo do Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {selectedBau ? (
            <>
              <img
                src={chest}
                className={styles.chestImage}
                alt="Imagem do Baú"
              />
              <ul>
                {selectedBau.itens.map((item) => (
                  <li key={item.nome}>
                    {item.nome}: {item.quantidade}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Nenhum baú selecionado</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
