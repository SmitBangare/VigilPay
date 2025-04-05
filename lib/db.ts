// This is a simplified mock database implementation
// In a real application, you would use Prisma, Mongoose, or another database ORM

import { connectToDatabase } from './mongodb';
import User, { IUser } from '@/models/User';

// MongoDB database interface
const user = {
  findUnique: async ({ where }: { where: { id?: string; email?: string; } }, select?: Record<string, boolean>) => {
    await connectToDatabase();
    
    const projection = select ? Object.fromEntries(Object.entries(select).map(([key, value]) => [key, 1])) : {};
    
    if (where.id) {
      return User.findById(where.id, projection);
    }
    if (where.email) {
      return User.findOne({ email: where.email }, projection);
    }
    return null;
  },
  create: async ({ data }: { data: Omit<IUser, 'createdAt'> }) => {
    await connectToDatabase();
    return User.create(data);
  },
}

// Export the database interface
export const db = {
  user,
};

