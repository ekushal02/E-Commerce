import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import {FaUserAlt} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {FaShoppingBag} from 'react-icons/fa';

const Header = () => {
  return <ReactNavbar 
    burgerColorHover = "#483d8b"  
    logo={logo}
    logoWidth ="20vmax"
    navColor1 ="white"
    logoHoverColor = "#483d8b" 
    link1Text = "Home"
    link2Text = "Products"
    link3Text = "Contact"
    link4Text = "About"
    
    link1Url = "/"
    link2Url = "/products"
    link3Url = "/contact"
    link4Url = "/about"
    
    link1Size = "1.5vmax"
    link1Color = "black"
    
    nav1justifyContent = "flex-end"
    nav2justifyContent = "flex-end"
    nav3justifyContent = "flex-start"
    nav4justifyContent = "flex-start"
    
    link1ColorHover = "#483d8b"
    link1Margin = "1vmax"
    
    profileIcon = "true"
    ProfileIconElement = {FaUserAlt}
    profileIconColor = "black"
    profileIconColorHover = "#483d8b"
    profileIconUrl = "/login"
    
    searchIcon = "true"
    SearchIconElement = {FaSearch}
    searchIconColor = "black"
    searchIconColorHover = "#483d8b"
    
    cartIcon = "true"
    CartIconElement = {FaShoppingBag}
    cartIconColor = "black"
    cartIconColorHover = "#483d8b"
    cartIconMargin = "1vmax"/>;
}

export default Header;
