import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { AppContext } from "./context/AppContext";

const App = () => {
  const navigate = useNavigate();
  const { loadUserData } = useContext(AppContext);
  useEffect(() => {
    //để thiết lập lắng nghe khi component mount
    onAuthStateChanged(auth, async (user) => {
      //theo dõi trạng thái đăng nhập của người dùng
      if (user) {
        navigate("/chat");
        await loadUserData(user.uid);
        //Người dùng đã đăng nhập
      } else {
        navigate("/");
        //Người dùng chưa đăng nhập, chuyển hướng về trang chủ
      }
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
