 // src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

// הגדרת ממשק IUser שמרחיב את Document של Mongoose (אובייקט Mongoose בסיסי)
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// יצירת סקימה למודל של משתמש
const UserSchema: Schema = new Schema({
  name: {
    type: String,  // סוג השדה - מיתר, יכול להיות סוגים שונים כמו String, Number וכו'
    required: true, // השדה חובה
  },
  email: {
    type: String,  // סוג השדה - מיתר
    required: true, // השדה חובה
    unique: true,   // לא יכול להיות כפול במערכת
  },
  password: {
    type: String,  // סוג השדה - מיתר
    required: true, // השדה חובה
  }
}, {
  timestamps: true, // יוצר אוטומטית שני שדות: createdAt ו-updatedAt
});

// יצירת המודל באמצעות הסקימה
const User = mongoose.model<IUser>('User', UserSchema);

export default User; // ייצוא המודל עבור שימוש בקבצים אחרים
