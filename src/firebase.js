// 必要な関数を import
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChttzaxXeiZaEwe-Wp2COLZ3caBqFwDro",
  authDomain: "dlbia-a5d79.firebaseapp.com",
  projectId: "dlbia-a5d79",
  storageBucket: "dlbia-a5d79.appspot.com",
  messagingSenderId: "539836875443",
  appId: "1:539836875443:web:9e39400420a322f06d66c6",
};

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig);
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app);
