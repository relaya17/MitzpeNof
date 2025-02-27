// client/src/receiptHelper.ts
export const downloadReceipt = async (payer: string, amount: number, chairmanName: string) => {
    const response = await fetch('http://localhost:5000/api/generate-receipt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payer, amount, chairmanName }),
    });
  
    if (response.ok) {
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl); // פותח את ה-PDF בדפדפן
    } else {
      alert('שגיאה ביצירת הקבלה');
    }
  };
  