import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ReceiptPage: React.FC = () => {
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [chairmanName, setChairmanName] = useState<string>('');

  useEffect(() => {
    const paymentData = location.state?.paymentInfo;
    if (paymentData) {
      setPaymentInfo(paymentData);
    }

    setChairmanName('יושב ראש אגודת מצפה נוף');
  }, [location]);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary">קבלה לתשלום</h2>
        {paymentInfo ? (
          <>
            <p><strong>שם הלקוח:</strong> {paymentInfo.payer}</p>
            <p><strong>סכום:</strong> {paymentInfo.amount} ₪</p>
            <p><strong>תאריך:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>יושב ראש אגודת מצפה נוף:</strong> {chairmanName}</p>
            <div className="mt-4 text-center">
              <p className="font-weight-bold text-success">תודה על התשלום!</p>
              <p>ההזמנה שלך הושלמה בהצלחה.</p>
            </div>
          </>
        ) : (
          <p>אין מידע על תשלום זמין.</p>
        )}
      </div>
    </div>
  );
};

export default ReceiptPage;
