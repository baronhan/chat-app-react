import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid); //Tạo một tham chiếu (reference) đến tài liệu (document) của người dùng trong Firestore.
      const userSnap = await getDoc(userRef); //Gửi yêu cầu đến Firestore để lấy dữ liệu của user với uid đã cho.
      const userData = userSnap.data(); //Trích xuất dữ liệu thực tế từ tài liệu trong Firestore.
      setUserData(userData);
      if (userData.name) {
        navigate("/chat");
      } else {
        navigate("/profile");
      }
      await updateDoc(userRef, { lastSeen: Date.now() }); //Lần đầu tiên khi người dùng mở ứng dụng, lastSeen được cập nhật ngay lập tức.
      setInterval(async () => {
        if (auth.chatUser) {
          //Kiểm tra auth.chatUser trước khi cập nhật để tránh lỗi khi không có người dùng nào đăng nhập.
          await updateDoc(userRef, { lastSeen: Date.now() });
        }
      }, 60000);
    } catch (error) {}
  };

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
