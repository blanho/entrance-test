
import express, { Application } from 'express';
import dotenv from "dotenv"
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import errorHandling from './middleware/errors';
import { setupSwagger } from './config/swagger';



const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'));
app.use(cookieParser(process.env.REFRESH_TOKEN_SECRET_KEY));

setupSwagger(app)


app.use("/api/v1/auth", authRouter)

app.use(errorHandling)

const port = process.env.PORT || 8000;  

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});