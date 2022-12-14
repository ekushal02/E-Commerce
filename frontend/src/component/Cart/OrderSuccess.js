import React from 'react';
import "./OrderSuccess.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className='orderSuccess'>
        <CheckCircleIcon />
        <Typography> YOUR ORDER HAS BEEN PLACED!!!:)</Typography>
        <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess