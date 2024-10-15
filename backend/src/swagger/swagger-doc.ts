import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';



export const apiDoc= (app:Router)=>{

   const options={
     swaggerDefinition:{
        swagger:'2.0',
        info:{
            title:'Api for job portal',
            version:'1.0.0',
            description:'API FOR JOB PORTAL'
        },
        host:'localhost:8000',
        basePath:'app/',
        schemes:['http','https'],
        tags:[
            {
                name:'User',
                description:'job portal management'
            }
        ]
     },
     apis:['./src/swagger/authentication.yaml']
   };
    const swaggerSpec=swaggerJSDoc(options);
    app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));


}