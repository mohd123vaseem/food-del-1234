import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000;
//edit
app.use('/images', express.static('uploads', {
  setHeaders: (res, path) => {
    res.set('Content-Type', 'image/png'); // Adjust based on image type (e.g., 'image/jpeg')
  }
}));
app.use('/images', (req, res, next) => {
  console.log(`Image request received for: ${req.path}`);
  next();
});



// middlewares
app.use(express.json())
// app.use(cors())
app.use(cors({ 
  origin: 'https://food-del-1234-frontend.onrender.com',
  credentials: true 
}));





// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
