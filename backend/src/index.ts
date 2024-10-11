import express from 'express';
import sequelize from './config/db';
import User from './models/user.model'; // Import all models
import JobSeeker from './models/jobSeeker.model';
import JobAgency from './models/JobAgency.model';
import Hobby from './models/hobby.model';

const app = express();

const syncDatabase = async () => {
  try {
    
    await sequelize.sync({force:true}); 
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};


syncDatabase();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});