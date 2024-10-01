import {Router} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { title, version } from 'process';

export const apiDoc=(app:Router)=>{

    const options={
        swaggerDefinition:{
            swagger:'2.0',
            info:{
                title: 'user-registration API',
                version: '1.0.0',
                description:'API FOR USER REGISTRATION'
            },
            host: 'localhost:8000',
            basePath:'/api/users',
            schemes:['http','https'],
            tags:[
                {
                    name:'User',
                    description:'User management',
                },
            ],
        },
        apis:['./src/swagger/authentication.yaml']
    };

    const swaggerSpec=swaggerJSDoc(options);
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

}

