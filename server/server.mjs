import express from "express";
import cors from "cors";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./firebase.js";

const app = express();
const port = 3001;
app.use(cors());

app.get("/data", async (req, res) => {
  const db = getFirestore();
  const bausRef = collection(db, "baus");
  const bausSnapshot = await getDocs(bausRef);
  const bausList = bausSnapshot.docs.map((doc) => doc.data());
  res.json(bausList);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
