import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:kushalerramilli@gmail.com">
        <Button>Contact: kushalerramilli@gmail.com</Button>
      </a>
      <a className="mailBtn" href="mailto:pavandasari.work@gmail.com">
        <Button>Contact: pavandasari.work@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;