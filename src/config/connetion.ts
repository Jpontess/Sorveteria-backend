import { config } from 'dotenv';
import mongoose from 'mongoose';

config();
export const connection = () => {
  const CONNECTIONSTRING = process.env.MONGO_URI;

  if (!CONNECTIONSTRING){
    console.log('error');
    return;
  };

  mongoose.connect(CONNECTIONSTRING)
    .then(() => console.log('Sucess conection in database'))
    .catch(error => console.error(`${error}`));
};