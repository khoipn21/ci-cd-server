import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
console.log("Importing routes...");
import authRoutes from "./routes/auth.js";
console.log("Auth routes imported:", !!authRoutes);
import productRoutes from "./routes/products.js";
console.log("Product routes imported:", !!productRoutes);
import cartRoutes from "./routes/cart.js";
console.log("Cart routes imported:", !!cartRoutes);
import orderRoutes from "./routes/orders.js";
console.log("Order routes imported:", !!orderRoutes);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json());

// MongoDB connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("MongoDB connection error:", error));

// Health check route
app.get("/api/health", (req, res) => {
	res.json({ message: "Healthn OK!" });
});

// API Routes
console.log("Setting up routes...");

// Add request logging middleware
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
	next();
});

app.use("/api/auth", authRoutes);
console.log("Auth routes loaded, stack length:", authRoutes.stack?.length || 0);
app.use("/api/products", productRoutes);
console.log("Product routes loaded, stack length:", productRoutes.stack?.length || 0); 
app.use("/api/cart", cartRoutes);
console.log("Cart routes loaded, stack length:", cartRoutes.stack?.length || 0);
app.use("/api/orders", orderRoutes);
console.log("Order routes loaded, stack length:", orderRoutes.stack?.length || 0);

console.log("All routes loaded successfully");

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
	console.log(`Web Shop API Server is running on port ${PORT}`);
});
