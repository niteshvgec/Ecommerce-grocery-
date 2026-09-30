import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import cartRoutes from "./routes/cartroutes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";
import { connectCloudinary } from "./config/cloudinary.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
connectDB();
connectCloudinary;
const allowedOrigins = ["http://localhost:5173"];

//middlewware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());

//api Endpoints
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/image", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// * `express.json()` → Reads JSON data from the request body.
// * `app` → Express application object used to configure middleware, routes, APIs, and server.
// * `credentials: true` → Allows cookies/credentials in cross-origin requests.
// * `cookie-parser` → Reads cookies from incoming requests.

//                 React Frontend
//                       │
//                       │ HTTP Request
//                       ▼
//              ┌─────────────────┐
//              │  Express Server  │
//              └────────┬────────┘
//                       │
//                 Middleware
//                       │
//          ┌────────────┼────────────┐
//          ↓            ↓            ↓
//       JSON          CORS       Cookies
//          │
//          └────────────┬────────────┘
//                       ↓
//                    Routes
//                       │
//    ┌─────────┬────────┼────────┬─────────┐
//    ↓         ↓        ↓        ↓         ↓
//  User     Product    Cart     Order    Address
//    │         │        │        │         │
//    └─────────┴────────┼────────┴─────────┘
//                       ↓
//                  Controllers
//                       ↓
//                    Mongoose
//                       ↓
//                    MongoDB
