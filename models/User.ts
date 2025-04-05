import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { 
    type: String, 
    required: [true, 'Please provide a name'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create or retrieve the User model
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User; 