import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slice/gardeningSlice';

const Gardening = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const [wateringAmount, setWateringAmount] = useState('');
  const [soilCheck, setSoilCheck] = useState('');
  const [task, setTask] = useState('');
  const [treatmentType, setTreatmentType] = useState<string[]>([]);
  const [treatmentDetails, setTreatmentDetails] = useState('');

  const handleTreatmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTreatmentType((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask({ date, wateringAmount, soilCheck, task, treatmentType, treatmentDetails }));
  };

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">גינון</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} dir="rtl">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="mb-3 text-center">
                  <label htmlFor="date" className="form-label">יום</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-3 text-center">
                  <label htmlFor="wateringAmount" className="form-label">פירוט ביצוע העבודה</label>
                  <input
                    type="text"
                    className="form-control"
                    id="wateringAmount"
                    value={wateringAmount}
                    onChange={(e) => setWateringAmount(e.target.value)}
                  />
                </div>
              
                <div className="mb-3 text-center">
                  <label className="form-label">סוג טיפול</label>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="טיפול טפטפות" id="drip" onChange={handleTreatmentChange} checked={treatmentType.includes("טיפול טפטפות")} />
                    <label className="form-check-label" htmlFor="drip">טיפול טפטפות</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="חיטוב עצים" id="pruning" onChange={handleTreatmentChange} checked={treatmentType.includes("חיטוב עצים")} />
                    <label className="form-check-label" htmlFor="pruning">חיטוב עצים</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="גיזום" id="trimming" onChange={handleTreatmentChange} checked={treatmentType.includes("גיזום")} />
                    <label className="form-check-label" htmlFor="trimming">גיזום</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="שתילה" id="planting" onChange={handleTreatmentChange} checked={treatmentType.includes("שתילה")} />
                    <label className="form-check-label" htmlFor="planting">שתילה</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="אחר" id="else" onChange={handleTreatmentChange} checked={treatmentType.includes("אחר")} />
                    <label className="form-check-label" htmlFor="else">אחר</label>
                  </div>
                </div>
                {treatmentType.length > 0 && (
                  <div className="mb-3 text-center">
                    <label htmlFor="treatmentDetails" className="form-label">פירוט הטיפול</label>
                    <input
                      type="text"
                      className="form-control"
                      id="treatmentDetails"
                      value={treatmentDetails}
                      onChange={(e) => setTreatmentDetails(e.target.value)}
                    />
                  </div>
                )}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">שמור</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* מידע נוסף על השקיית דשא באזור הערבה */}
      <div className="container mt-5">
        <h3 className="text-center D" style={{ fontSize: '1.75rem', textDecoration: 'underline' }}>המלצות כלליות להשקיה</h3>
        <ul className="list-group text-center">
          <li className="list-group-item">📌 <strong>בקיץ:</strong> 7–9 מ״ק מים לדונם ליום (7,000–9,000 ליטר), השקיה 6–8 שעות ביום עקב חום קיצוני ויובש</li>
          <li className="list-group-item">📌 <strong>באביב ובסתיו:</strong> 4–6 מ״ק מים לדונם ליום (4,000–6,000 ליטר), השקיה 4–5 שעות ביום</li>
          <li className="list-group-item">📌 <strong>בחורף:</strong> השקיה מינימלית, לרוב אין צורך כלל אלא אם יש תקופות יובש ממושכות, השקיה 1–2 שעות ביום</li>
        </ul>

        <h3 className="mt-4 text-center" style={{ fontSize: '1.75rem', textDecoration: 'underline' }}>סוגי דשא מומלצים לאקלים חם ויבש בישראל</h3>
        <ul className="list-group text-center">
          <li className="list-group-item">🌾 <strong>דרבן גרס</strong> – עמיד לחום ויובש, מתאים לאקלים חם ויבש</li>
          <li className="list-group-item">🌱 <strong>ברמודה גרס</strong> – מתאים לאקלים חם במיוחד ודורש מעט מים, נפוץ בישראל</li>
          <li className="list-group-item">🍀 <strong>זויסיה</strong> – חסכוני במים, עמיד לחום ומעט תחזוקה, נפוץ גם באזורים חמים בארץ</li>
        </ul>

        <h3 className="mt-4 text-center" style={{ fontSize: '1.75rem', textDecoration: 'underline' }}>שתילים וצמחים עמידים לחום</h3>
        <ul className="list-group text-center">
          <li className="list-group-item">🌿 <strong>לבנדר</strong> – ריחני, עמיד לשמש וחסכוני במים</li>
          <li className="list-group-item">🌵 <strong>סוקולנטים</strong> – כמעט ואינם דורשים מים, פופולריים בישראל</li>
          <li className="list-group-item">🌼 <strong>רוזמרין</strong> – צמח תבלין עמיד ליובש</li>
          <li className="list-group-item">🌳 <strong>עצי זית</strong> – מושלם לאקלים חם, נפוץ מאוד בישראל</li>
        </ul>

        <h3 className="mt-4 text-center" style={{ fontSize: '1.75rem', textDecoration: 'underline' }}>עצי פרי טרופיים שמתאימים לאזור הערבה</h3>
        <ul className="list-group text-center">
          <li className="list-group-item">🥭 <strong>מנגו</strong> – עץ פרי טרופי שמספק פרי טעים ונפוץ באזורים טרופיים, זמין בישראל</li>
          <li className="list-group-item">🥑 <strong>אבוקדו</strong> – עץ פרי טרופי, דורש הרבה שמש והשקיה מתונה, נפוץ בישראל</li>
          <li className="list-group-item">🌴 <strong>קוקוס</strong> – עץ גבוה ויפה, דורש חום ולחות</li>
          <li className="list-group-item">🍍 <strong>פסיפלורה</strong> – צמח מטפס שמייצר פרי טעים, ניתן למצוא בישראל</li>
          <li className="list-group-item">🍋 <strong>לימון</strong> – עץ פרי טרופי שיכול להצליח באקלים חם מאוד, נמצא בארץ</li>
        </ul>

        <h3 className="mt-4 text-center" style={{ fontSize: '1.75rem', textDecoration: 'underline' }}>שיחים ופרחים עמידים לחום</h3>
        <ul className="list-group text-center">
          <li className="list-group-item">🌸 <strong>היביסקוס</strong> – פרח יפהפה ועמיד לשמש, נפוץ בישראל</li>
          <li className="list-group-item">🌻 <strong>דחליל</strong> – פרח עמיד מאוד לשמש, בצבעים עזים</li>
          <li className="list-group-item">🌼 <strong>ציפורני חתול</strong> – פרח עמיד שחי טוב באקלים חם</li>
          <li className="list-group-item">🌹 <strong>ורדים</strong> – מתאימים גם לאקלים חם ויבש עם השקיה מתונה</li>
          <li className="list-group-item">🍂 <strong>סמבוק</strong> – שיח חסכוני במים שמתאים לחום</li>
        </ul>

        <h3 className="mt-4 text-center" style={{ fontSize: '1.75rem', textDecoration: 'underline' }}>מחלות באדמה, בפרחים ובדשא וכיצד לטפל בהן</h3>
        <ul className="list-group text-center">
          <li className="list-group-item">🦠 <strong>פטרת דשא</strong> – מחלה שנגרמת בשל עודף מים או השקיה לא סדירה. טיפול: הפחתת השקיה, אוורור הקרקע. <br /> <strong>סימנים:</strong> כתמים חומים או צהובים על הדשא.</li>
          <li className="list-group-item">🦠 <strong>ריקבון שורשים</strong> – נגרם כאשר הקרקע אינה מנוקזת היטב. טיפול: השקיה בצורה מבוקרת ותחלופת קרקע במידת הצורך. <br /> <strong>סימנים:</strong> שורשים רכים עם ריח רע.</li>
          <li className="list-group-item">🦠 <strong>מזיקים על צמחים</strong> – ניתן למצוא על פרחים ושיחים. טיפול: שימוש בחומרים דוחים או אורגניים כמו תמציות צמחים דוחי חרקים. <br /> <strong>סימנים:</strong> חורים בעלים, צמחים דהויים.</li>
          <li className="list-group-item">🦠 <strong>פטריות עובש</strong> – מחלה שנגרמת בעטיה של לחות גבוהה. טיפול: חיתוך חלקי הצמח הנגועים והפחתת הלחות. <br /> <strong>סימנים:</strong> עובש לבן על הצמחים.</li>
          <li className="list-group-item">🦠 <strong>עשבים שוטים</strong> – יש להסירם באופן ידני או עם חומרים אורגניים להסרת עשבים. <br /> <strong>סימנים:</strong> צמחים בלתי רצויים בשטח הגינה.</li>
        </ul>
      </div>
    </div>
  );
};

export default Gardening;
