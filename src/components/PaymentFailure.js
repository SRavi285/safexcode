import React, { useContext } from 'react';
import { Typography, Container } from '@mui/material';
import { UserContext } from '../context/UserContext';
function PaymentFailure() {
    const { user, logout } = useContext(UserContext);
  console.log("userrrr",user)
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" color="error">
        Payment Failed ❌
      </Typography>
      <Typography align="center" sx={{ mt: 2 }}>
        Please try again or contact support.
      </Typography>
    </Container>
  );
}

export default PaymentFailure;
