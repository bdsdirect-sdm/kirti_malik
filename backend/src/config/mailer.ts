import nodemailer from 'nodemailer';

const sendWelcomeEmail = async (email: string, password: string) => {
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
    subject: 'Welcome!',
    text: `Thank you for registering. Your login details are:\nEmail: ${email}\nPassword: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendWelcomeEmail };
