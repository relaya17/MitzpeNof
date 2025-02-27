import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFile, removeFile } from "../redux/slice/newResidentApprovalSlice";
import { RootState } from "../redux/store"; 
import { PDFDocument } from "pdf-lib";

interface FileData {
  id: string;
  name: string;
  url: string;
}

const NewResidentApproval: React.FC = () => {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.files.files || []); // גישה נכונה ל-state
  const [fileInput, setFileInput] = useState<File | null>(null); // קובץ עם סוג File או null
  const [isApproved, setIsApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");

  const generateUniqueId = (file: File) => `${file.name}-${file.lastModified}`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const isDuplicate = files.some((f: { id: string }) => f.id === generateUniqueId(file));
      if (isDuplicate) {
        setErrorMessage("הקובץ כבר הועלה.");
      } else {
        setFileInput(file);
        setErrorMessage(null);
      }
    }
  };

  const convertToPdf = async (file: File): Promise<string> => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText(file.name, { x: 50, y: 350 });
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
  
    return URL.createObjectURL(blob);
  };
  
  
  const handleUpload = async () => {
    if (fileInput) {
      setLoading(true);
      setErrorMessage(null);
      try {
        const pdfUrl = await convertToPdf(fileInput);
        const uniqueId = generateUniqueId(fileInput);
        dispatch(addFile({ id: uniqueId, name: fileInput.name, url: pdfUrl }));
        setSuccessMessage("הקובץ הועלה בהצלחה!");
        setFileInput(null);
      } catch (error) {
        setErrorMessage("אירעה שגיאה בהעלאת הקובץ.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveFile = (fileId: string) => {
    dispatch(removeFile(fileId));
  };

  const handleAcceptanceTest = () => {
    setIsApproved(true);
    setErrorMessage(null);
  };

  const validateName = (name: string) => /^[a-zA-Z\u0590-\u05FF\s]+$/.test(name);
  const validateId = (id: string) => /^[0-9]{9}$/.test(id);

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <div className="card p-4 shadow w-75 text-end">
        <h1 className="text-center mb-4">מבחני קבלה ,חוזה שכירות ,צילומי תעודת זהות</h1>

        <div className="mb-3 d-flex justify-content-center">
          <input type="file" className="form-control w-75 text-end" onChange={handleFileUpload} />
        </div>

        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-primary w-75" onClick={handleUpload} disabled={!fileInput || loading}>
            {loading ? "מעלה קובץ..." : "העלה סריקה והמר ל-PDF"}
          </button>
        </div>

        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

        <ul className="list-group mt-4">
          {files.map((file) => (
            <li key={file.id} className="list-group-item d-flex justify-content-between align-items-center text-end">
              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFile(file.id)}>X</button>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <form onSubmit={(e) => e.preventDefault()} className="text-end">
            <div className="mb-3">
              <label className="form-label">שם מלא</label>
              <input
                type="text"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => !validateName(name) && setErrorMessage("שם מלא לא תקין.")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">מספר תעודת זהות</label>
              <input
                type="text"
                className="form-control"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                onBlur={() => !validateId(id) && setErrorMessage("תעודת זהות לא תקינה.")}
              />
            </div>
            <button type="submit" className="btn btn-success w-100" onClick={handleAcceptanceTest}>
              הגש מבחן קבלה
            </button>
          </form>
        </div>

        {isApproved && <div className="alert alert-success mt-4 text-end"><strong>ברוך הבא!</strong> הדייר עבר את מבחן הקבלה.</div>}
      </div>
    </div>
  );
};

export default NewResidentApproval;
