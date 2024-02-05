import {cleanEnv, num, str} from 'envalid';
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
    PORT: num({ default: 3000 }),
    MONGODB_URL: str()
});
export default env;