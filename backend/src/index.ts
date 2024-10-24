import express from 'express';
import sequelize from './config/db';
import cors from 'cors';
import http from 'http';

import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port=process.env.PORT;





const syncDatabase = async () => {
  try {
    
    await sequelize.sync({force:false}); 
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

syncDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});