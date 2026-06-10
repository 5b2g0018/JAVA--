// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 這是你剛剛熱騰騰拿到的雲端鑰匙！
const firebaseConfig = {
    apiKey: "AIzaSyBuzl7ewz9pXfM3NBdj2d0ueykkDhxaBYE",
    authDomain: "java-project-35ae8.firebaseapp.com",
    projectId: "java-project-35ae8",
    storageBucket: "java-project-35ae8.firebasestorage.app",
    messagingSenderId: "329494286722",
    appId: "1:329494286722:web:37a9e6e981da98118e3f9b",
    measurementId: "G-B13H7EKDFP"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 匯出雲端資料庫（Firestore），給其他組件呼叫
export const db = getFirestore(app);