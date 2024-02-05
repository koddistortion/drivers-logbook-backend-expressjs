import * as dotenv from 'dotenv'
import express from 'express'
import logger from "morgan";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();

app.use(express.json())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export default app;
