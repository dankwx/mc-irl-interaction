import { Accordion, Card, Modal } from "react-bootstrap";
import { CustomToggle } from "../../components/CustomToggle";
import { Header } from "../../components/Header";
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

  function generateItemImageURL(itemName: string) {
    // Remove "minecraft_" from the itemName
    const cleanedName = itemName.replace("minecraft:", "");

    // Construct the image URL
    const imageURL = `https://mc.nerothe.com/img/1.20.1/${cleanedName}.png`;

    return imageURL;
  }

  type ItemData = {
    nome: string;
    quantidade: number;
  };

  function sortItemsByQuantity(items: ItemData[]) {
    return items.slice().sort((a, b) => b.quantidade - a.quantidade);
  }

  return (
    <div className={styles.HomeBody}>
      <Header />
      {data ? (
        <div className={styles.containerCards}>
          {data.map((bau) => (
            <Card key={bau.id} className={styles.singleCard}>
              <Card.Header>
                <CustomToggle eventKey={bau.id}>
                  {bau.nome} - ID: {bau.id}
                </CustomToggle>
              </Card.Header>
              <Card.Body>
                <img
                  src={chest}
                  className={styles.chestImage}
                  alt="Imagem do Baú"
                  onClick={() => handleChestClick(bau.id)}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
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
              <ul>
                {sortItemsByQuantity(selectedBau.itens).map((item) => (
                  <li key={item.nome}>
                    <span className={styles.itemQuantity}>
                      {item.quantidade}
                    </span>
                    <img
                      src={generateItemImageURL(item.nome)}
                      alt={item.nome}
                      className={styles.itemImage}
                    />
                    {/* {item.nome}: {item.quantidade} */}
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
