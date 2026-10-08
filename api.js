import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAuFp-IVhL76KL00mxx_xdcPdS9IrODjB8",
  authDomain: "vanlife-fe5e3.firebaseapp.com",
  projectId: "vanlife-fe5e3",
  storageBucket: "vanlife-fe5e3.firebasestorage.app",
  messagingSenderId: "1066160598849",
  appId: "1:1066160598849:web:8efc0468ef542e22aa3bc0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
