import express from 'express';
import sequelize from './config/db';
import router from './routers/authRouter';
import cors from 'cors';
import { apiDoc } from './swagger/swagger-doc';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/app',router)
apiDoc(router)
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