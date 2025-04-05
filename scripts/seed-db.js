// This script seeds the database with an initial admin user
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Simple hash function - same as the one in auth-actions.ts
function hashPassword(password) {
  return Array.from(password)
    .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
    .toString(16);
}

async function seedDatabase() {
  try {
    // Load environment variables from .env.local
    const envPath = path.resolve('.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const envVars = envContent.split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, {});
      
      Object.assign(process.env, envVars);
    }

    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fraud-detection';
    console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB!');

    // Define User Schema (simplified version of what's in models/User.ts)
    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

    // Create model
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });

    if (existingAdmin) {
      console.log('Admin user already exists, skipping creation');
    } else {
      // Create admin user
      const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        // Password: "admin123" (hashed)
        password: hashPassword('admin123'),
        role: 'ADMIN',
      });

      console.log('Admin user created successfully:', adminUser);
    }

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close connection
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedDatabase(); 