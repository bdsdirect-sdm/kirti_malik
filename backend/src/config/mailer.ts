import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
console.log('you are entereing in email')
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"malikkirti7464@gmail.com",
        pass:"zfyqzrhwjjxieamx"
    }
})

const loadTemplate=(username:string)=>{
    const templatePath=path.join(__dirname,'template.html')
    let template=fs.readFileSync(templatePath,'utf8');
    return template.replace(/{{username}}/g,username)
    
}
console.log('email created success')
export const sentRegistrationEmail=async(email:string,username:string)=>{
    const htmlContent=loadTemplate(username)
    const mailOptions={
        from:"kirti <malikkirti7464@gmail.com>",
        to: email,
        text:`helo ${username},\n\n thankyou for registering`,
        html:htmlContent

    };

    try{
        await transporter.sendMail(mailOptions);
        console.log('email sent successfully');
    }
    catch(error){
         console.error('error sending email',error)
    }
}