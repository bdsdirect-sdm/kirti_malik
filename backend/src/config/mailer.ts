import nodemailer from 'nodemailer';

const sendWelcomeEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'malikkirti7464@gmail.com',
      pass:"zfyqzrhwjjxieamx",
    },
  });


  const mailOptions = {
    from: 'malikkirti7464@gmail.com',
    to: email,
    subject: 'OTP verification for registration ',
    text: `your otp is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendWelcomeEmail };