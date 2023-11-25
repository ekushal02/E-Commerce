import React, { Fragment, useState } from "react";
import "./Header.css";
import { FaUser, FaSignOutAlt, FaClipboardList, FaShoppingCart } from 'react-icons/fa';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { RiDashboardFill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {

  const { cartItems } = useSelector((state) => state.cart);

  const [isBackdropVisible, setIsBackdropVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <FaClipboardList />, name: "Orders", func: orders },
    { icon: <FaUser />, name: "Profile", func: account },
    {
      icon: (
        <FaShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <FaSignOutAlt />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <RiDashboardFill />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function toggleBackdrop() {
    setIsBackdropVisible(!isBackdropVisible);
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  return (
    <Fragment>
      {isBackdropVisible && <div className="custom-backdrop" onClick={toggleBackdrop}></div>}
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => toggleBackdrop()}
        onOpen={() => toggleBackdrop()}
        style={{ zIndex: "11" }}
        open={isBackdropVisible}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
            style={{ width: "50px", height: "50px" }}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
