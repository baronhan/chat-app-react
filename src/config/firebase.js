import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDwEuSguUYCWRKk_LAozBXFh4B8HqkZX0U",
  authDomain: "chat-app-gs-b438f.firebaseapp.com",
  projectId: "chat-app-gs-b438f",
  storageBucket: "chat-app-gs-b438f.firebasestorage.app",
  messagingSenderId: "471137029009",
  appId: "1:471137029009:web:5d9d1ace996ca38815a830"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //auth giúp firebase biết mình đang làm việc với app nào, vì một dự án có thể có nhiều ứng dụng
const db = getFirestore(app)

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        //Setdoc là hàm được dùng để ghi document vào firestore

        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey, There I am using chat app",
            lastSeen: Date.now(),
        });

        await setDoc(doc(db, "chats", user.uid), {
            chatData: []
        });

        toast.success("Đăng ký thành công!");
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

export {signup, login, logout, auth, db}