import express from 'express';
import cors from 'cors';
import sequelize from './config/db';

const app=express();

app.use(cors());
app.use(express.json());


const port=process.env.PORT 

const syncDatabase=async()=>{
    try{

        await sequelize.sync({force:true});
        console.log("database synced successfully")

    }
    catch(error){
        console.error('failed to sync database ',error)

    }

}
syncDatabase();

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})