import cors from "cors";
import path from "path";
import express from "express"; //(1)
import dotenv from "dotenv"; //(6)
import pkg from "cloudinary";

import authRoutes from "./routes/auth.routes.js"; //(4)
import  postRoutes from "./routes/post.routes.js"
import userRoutes from "./routes/user.routes.js";
import notificationRoutes from "./routes/notification.routes.js"
import connectMongpoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

const { v2: cloudinary } = pkg;
dotenv.config();  //(8)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();  //(3)
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

//console.log(process.env.MONGO_URI); //(7)

app.use(express.json({limit: "5mb"})); //should not be too large to prevent DOS
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"https://twitter-clone-frontend-alpha-six.vercel.app",
		],
       
		credentials: true,
	})
);

app.use("/api/auth",authRoutes);  //(5)
app.use("/api/users",userRoutes); 
app.use("/api/posts",postRoutes); 
app.use("/api/notifications",notificationRoutes); 

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "/frontend/dist")));

//     app.get(/.*/, (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
//     })
// }
app.get("/", (req, res) => {
    res.send("API is running ✅");
});

connectMongpoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  //(2)
    
});

export default app;