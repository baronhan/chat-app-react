import React, { useContext } from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../config/firebase";

const LeftSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Edit Profile
              </p>
              <hr />
              <p onClick={() => logout()}>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder="Search here..." />
        </div>
      </div>
      <div className="ls-list">
        {Array(12)
          .fill() /**Tạo mảng có giá trị rỗng với số phần tử trong mảng là 12 */
          .map((item, index) => (
            <div key={index} className="friends">
              <img src={assets.profile_img} alt="" />
              <div>
                <p>Richard Sanford</p>
                <span>Hello, How are you?</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
