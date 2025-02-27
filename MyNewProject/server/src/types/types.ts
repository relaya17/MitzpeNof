// בקובץ types.ts

export type User = {
  id: string;
  name: string;
  email: string;
};

export type SignUpAction = 
  | { type: 'SIGN_UP_REQUEST' }
  | { type: 'SIGN_UP_SUCCESS'; payload: { user: User } }
  | { type: 'SIGN_UP_ERROR'; payload: { error: string } };
