const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Naitik Shah <shahnaitik412@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // to: 'naitik.1112004@gmail.com',
    // subject: '👋 Hello from1 Node.js 🚀',
    // text: 'This is a test email sent from Node.js using nodemailer. 📧💻',
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
