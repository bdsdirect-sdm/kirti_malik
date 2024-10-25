import { body } from "express-validator";

export const RegisterValidator=[
    body('firstName')
    .notEmpty().withMessage('first name is required')
    .isString()
    .isLength({min:3}).withMessage('first name must be 3 characters long'),

    body('lastName')
    .notEmpty().withMessage('last name is required')
    .isString()
    .isLength({min:3}).withMessage('last name must be 3 characters long'),

     body('companyName')
    .notEmpty().withMessage('company name is required')
    .isString()
    .isLength({min:3}).withMessage('company name must be 3 characters long'),

     body('email')
     .notEmpty().withMessage('email is required')
     .isEmail().withMessage('provide valid email'),

    body('phoneNumber')
    .notEmpty().withMessage('phone number is required')
    .isString().withMessage('phone number must be string')
     .custom((value)=>{
          if(value.length!==10){
            return Promise.reject('phone number should be 10 digits');
          }
          else{
            return true;
          }
     }),

       body('address')
    .notEmpty().withMessage('address name is required')
    .isString()
    .isLength({min:3}).withMessage('address name is required'),
    

    body('companyLogo')
        .custom((value) => {
            if (value && !(value instanceof File)) {
                throw new Error('companyLogo must be a file.');
            }
            return true;
        }),
    body('profileImage')
        .custom((value) => {
            if (value && !(value instanceof File)) {
                throw new Error('Profile image must be a file.');
            }
            return true;
        }),

]
