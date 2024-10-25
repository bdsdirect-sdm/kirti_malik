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

    body('phone')
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

     body('email')
     .notEmpty().withMessage('email is required')
     .isEmail().withMessage('provide valid email'),

     body('gender')
     .isIn(['male','female','other'])
     .withMessage('gender must be male, female or other'),

    body('userType')
    .notEmpty().withMessage('user type must be selected')
    .isIn(['job seeker', 'job agency'])
    .withMessage('user type must be either job seeker or job agency'),

    body('agency')
    .optional(),

    body('hobbies')
   .notEmpty(),

    body('resume')
        .custom((value) => {
            if (value && !(value instanceof File)) {
                throw new Error('Resume must be a file.');
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
