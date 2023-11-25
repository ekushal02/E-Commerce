import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import store from "./store"; // Replace with the actual path to your Redux store
import App from "./App"; // Replace with the actual path to your App component

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ToastContainer
        position="bottom-center" // Set the position as per your preference
        autoClose={5000} // Set the timeout in milliseconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
