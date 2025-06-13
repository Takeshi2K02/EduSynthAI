// backend/services/emailService.js
const nodemailer = require('nodemailer');

const sendResetEmail = async (to, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"EduSynthAI" <${process.env.EMAIL_FROM}>`,
    to,
    subject: 'Password Reset Request',
    html: `
      <p>You requested to reset your password.</p>
      <p>Click the link below to proceed:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link is valid for 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;