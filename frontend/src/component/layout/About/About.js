import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/_e._.kushal_292_/";
  };
  const visitInstagram1 = () => {
    window.location = "https://www.instagram.com/_pavan_dasari_/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <div className="myflex">
              <div className="insideflex">
              <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/ddqjts3kp/image/upload/v1658222879/avatars/djtrk1omnfim2thvistx.png"
              alt="Founder"
            />
            <Typography>Kushal Erramilli</Typography>
            <Button onClick={visitInstagram} color="primary">Visit Instagram</Button>
              </div>
              <div className="insideflex">
              <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/ddqjts3kp/image/upload/v1658904311/avatars/nlu84wmnynlqlcciazh6.jpg"
              alt="Founder"
            />
            <Typography>Pavan Sai Dasari</Typography>
            <Button onClick={visitInstagram1} color="primary">Visit Instagram</Button>
              </div>
            </div>
            
            <span>
              This is a E-Commerce Website developed By Kushal Erramilli and Dasari Pavan Sai using MERN Stack</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.instagram.com/_e._.kushal_292_/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;