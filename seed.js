import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999.99,
    category: 'electronics',
    brand: 'Apple',
    stock: 50,
    images: ['https://via.placeholder.com/400x400/007bff/ffffff?text=iPhone+15+Pro'],
    featured: true,
    rating: { average: 4.8, count: 125 }
  },
  {
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone with AI-powered features',
    price: 899.99,
    category: 'electronics',
    brand: 'Samsung',
    stock: 30,
    images: ['https://via.placeholder.com/400x400/28a745/ffffff?text=Galaxy+S24'],
    featured: true,
    rating: { average: 4.6, count: 89 }
  },
  {
    name: 'MacBook Air M3',
    description: 'Ultra-lightweight laptop with M3 chip and all-day battery life',
    price: 1299.99,
    category: 'electronics',
    brand: 'Apple',
    stock: 25,
    images: ['https://via.placeholder.com/400x400/6c757d/ffffff?text=MacBook+Air'],
    featured: true,
    rating: { average: 4.9, count: 67 }
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Air Max cushioning',
    price: 129.99,
    category: 'clothing',
    brand: 'Nike',
    stock: 100,
    images: ['https://via.placeholder.com/400x400/dc3545/ffffff?text=Nike+Air+Max'],
    featured: false,
    rating: { average: 4.4, count: 234 }
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with responsive cushioning',
    price: 189.99,
    category: 'clothing',
    brand: 'Adidas',
    stock: 75,
    images: ['https://via.placeholder.com/400x400/000000/ffffff?text=Ultraboost'],
    featured: false,
    rating: { average: 4.5, count: 156 }
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling wireless headphones',
    price: 399.99,
    category: 'electronics',
    brand: 'Sony',
    stock: 40,
    images: ['https://via.placeholder.com/400x400/ffc107/000000?text=Sony+WH1000XM5'],
    featured: true,
    rating: { average: 4.7, count: 312 }
  },
  {
    name: 'The Art of Programming',
    description: 'Comprehensive guide to software development and algorithms',
    price: 49.99,
    category: 'books',
    brand: 'Tech Publications',
    stock: 200,
    images: ['https://via.placeholder.com/400x400/17a2b8/ffffff?text=Programming+Book'],
    featured: false,
    rating: { average: 4.3, count: 87 }
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-functional electric pressure cooker',
    price: 79.99,
    category: 'home',
    brand: 'Instant Pot',
    stock: 60,
    images: ['https://via.placeholder.com/400x400/6f42c1/ffffff?text=Instant+Pot'],
    featured: false,
    rating: { average: 4.6, count: 1024 }
  },
  {
    name: 'Wilson Tennis Racket Pro',
    description: 'Professional-grade tennis racket for serious players',
    price: 159.99,
    category: 'sports',
    brand: 'Wilson',
    stock: 35,
    images: ['https://via.placeholder.com/400x400/fd7e14/ffffff?text=Tennis+Racket'],
    featured: false,
    rating: { average: 4.2, count: 45 }
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip exercise mat perfect for yoga and pilates',
    price: 39.99,
    category: 'sports',
    brand: 'FitLife',
    stock: 150,
    images: ['https://via.placeholder.com/400x400/20c997/ffffff?text=Yoga+Mat'],
    featured: false,
    rating: { average: 4.1, count: 203 }
  },
  {
    name: 'Smart Watch Series 9',
    description: 'Advanced fitness tracking with health monitoring features',
    price: 299.99,
    category: 'electronics',
    brand: 'TechWear',
    stock: 80,
    images: ['https://via.placeholder.com/400x400/e83e8c/ffffff?text=Smart+Watch'],
    featured: true,
    rating: { average: 4.4, count: 167 }
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with built-in grinder',
    price: 149.99,
    category: 'home',
    brand: 'BrewMaster',
    stock: 45,
    images: ['https://via.placeholder.com/400x400/795548/ffffff?text=Coffee+Maker'],
    featured: false,
    rating: { average: 4.0, count: 298 }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@webshop.com',
      password: 'admin123',
      role: 'admin',
      address: {
        street: '123 Admin St',
        city: 'Admin City',
        state: 'AC',
        zipCode: '12345',
        country: 'USA'
      }
    });

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
      address: {
        street: '456 User Ave',
        city: 'User City',
        state: 'UC',
        zipCode: '67890',
        country: 'USA'
      }
    });

    console.log('Created users:', { admin: adminUser.email, user: regularUser.email });

    // Create products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Created ${products.length} products`);

    console.log('Database seeded successfully!');
    console.log('\\nLogin credentials:');
    console.log('Admin: admin@webshop.com / admin123');
    console.log('User: john@example.com / password123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedDatabase();