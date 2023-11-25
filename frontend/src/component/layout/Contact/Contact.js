import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:kushalerramilli@gmail.com">
        <Button>Contact: kushalerramilli.com</Button>
      </a>
    </div>
  );
};

export default Contact;
