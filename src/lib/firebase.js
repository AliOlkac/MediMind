// src/lib/firebase.js
// Firebase ve Firestore başlatıcı dosyası
// Bu dosya, uygulamanın her yerinde Firebase ve Firestore'u kullanmak için ortak bir referans sağlar.

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Firebase uygulamasını başlatıyoruz (tekrar başlatmamak için kontrol ekliyoruz)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore veritabanı örneğini oluşturuyoruz
const db = getFirestore(app);

export { db }; 