import * as dotenv from "dotenv";
const configEnv = () => dotenv.config();

configEnv();
export const environment = {
  apiUrl: process.env.API_URL || 'http://localhost:3001'
  };