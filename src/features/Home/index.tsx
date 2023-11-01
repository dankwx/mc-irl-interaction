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
  const [showBauModal, setShowBauModal] = useState(false);
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [selectedBauId, setSelectedBauId] = useState<string | null>(null);
  const [itemData, setItemData] = useState<ItemData[]>([]);
  const data = useFetchData<BauData[]>("http://localhost:3001/data");

  const handleChestClick = (bauId: string) => {
    setSelectedBauId(bauId);
    setShowBauModal(true);
  };

  const handleHeaderButtonClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos-itens");
      if (response.ok) {
        const items = await response.json();
        setItemData(items);
        setShowHeaderModal(true);
      }
    } catch (error) {
      console.error("Failed to fetch items from the new route: ", error);
    }
  };

  const selectedBau = data?.find((bau) => bau.id === selectedBauId);

  function generateItemImageURL(itemName: string) {
    const cleanedName = itemName.replace("minecraft:", "");

    // puxa imagens de itens do site
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
      <button className={styles.botaoHeader} onClick={handleHeaderButtonClick}>
        Exibir todos itens
      </button>
      {data ? (
        <div className={styles.containerCards}>
          {data.map((bau) => (
            <Card key={bau.id} className={styles.singleCard}>
              <Card.Header>
                <CustomToggle eventKey={bau.id}>{bau.nome}</CustomToggle>
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
        show={showBauModal}
        onHide={() => {
          setShowBauModal(false);
          setItemData([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedBau ? selectedBau.nome : "Itens"}</Modal.Title>
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
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Nenhum baú selecionado</p>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        className={styles.modalPai}
        show={showHeaderModal}
        onHide={() => {
          setShowHeaderModal(false);
          setItemData([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Todos itens</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <ul>
            {sortItemsByQuantity(itemData).map((item) => (
              <li key={item.nome}>
                <span className={styles.itemQuantity}>{item.quantidade}</span>
                <img
                  src={generateItemImageURL(item.nome)}
                  alt={item.nome}
                  className={styles.itemImage}
                />
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}
