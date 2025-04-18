import React, { useContext, useEffect, useState } from 'react';
import { Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function PaymentSuccess() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!user?.phoneNumber) {
        navigate('/login');
        return;
      }

      try {
        const q = query(
          collection(db, 'users'),
          where('phoneNumber', '==', user.phoneNumber)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          const isPaymentDone = userData?.isPaymentDone || false;
          console.log("isPaymentDone", isPaymentDone)
          if (!isPaymentDone) {
            navigate('/payment');
          }
        } else {
          navigate('/login'); // no user found
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [user, navigate]);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" color="primary">
        Payment Successful ✅
      </Typography>
      <Typography align="center" sx={{ mt: 2 }}>
        You can now continue using the app.
      </Typography>
    </Container>
  );
}

export default PaymentSuccess;
