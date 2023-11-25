// Dashboard.js
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    let outOfStockCount = 0;
    products &&
      products.forEach((item) => {
        if (item.Stock <= 0) {
          outOfStockCount += 1;
        }
      });
    setOutOfStock(outOfStockCount);

    let totalAmountCount = 0;
    orders &&
      orders.forEach((item) => {
        totalAmountCount += item.totalPrice;
      });
    setTotalAmount(totalAmountCount);
  }, [products, orders]);

  const lineChartData = [
    { name: "Initial Amount", totalAmount: 0 },
    { name: "Amount Earned", totalAmount },
  ];

  const doughnutChartData = [
    { name: "Out of Stock", value: outOfStock },
    { name: "In Stock", value: products.length - outOfStock },
  ];

  const lineChartOptions = {
    chart: {
      id: "basic-line",
    },
    xaxis: {
      categories: ["Initial Amount", "Amount Earned"],
    },
  };

  const doughnutChartOptions = {
    labels: ["Out of Stock", "InStock"],
    colors: ["#FF5733", "#33FF57"],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContent">
        <Typography component="h1" variant="h4" className="dashboardHeading">
          Dashboard
        </Typography>

        <div className="totalAmountBox">
          <p>Total Amount</p>
          <div className="totalAmountValue">₹{totalAmount}</div>
        </div>

        <div className="dataCircles">
          <Link to="/admin/products" className="circle circle1">
            <p align="center">Product
              <br></br>
              {products && products.length}
            </p>
          </Link>
          <Link to="/admin/orders" className="circle circle2">
            <p align="center">Orders
              <br></br>
              {orders && orders.length}
            </p>
          </Link>
          <Link to="/admin/users" className="circle circle3">
            <p align="center">Users
            <br></br>
            {users && users.length}
            </p>
          </Link>
        </div>

        <div className="lineChart">
          <ReactApexChart
            options={lineChartOptions}
            series={[{ data: lineChartData.map((item) => item.totalAmount) }]}
            type="line"
          />
        </div>

        <div className="doughnutChart">
          <ReactApexChart
            options={doughnutChartOptions}
            series={doughnutChartData.map((item) => item.value)}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
