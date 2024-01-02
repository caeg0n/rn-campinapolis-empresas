import { initializeApp } from "firebase/app";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {  } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCrtaYraLMJTHUO0VbxSraNlgYf-2cEQs0",
  authDomain: "rn-campinapolis-compras.firebaseapp.com",
  projectId: "rn-campinapolis-compras",
  storageBucket: "rn-campinapolis-compras.appspot.com",
  messagingSenderId: "800809208578",
  appId: "1:800809208578:web:f3754a0058af65c6e5101b"
};
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
