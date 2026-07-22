import nodemailer from "nodemailer";

export const sendMail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  transporter.sendMail(
    {
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: html,
    },
    (err, info) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(info.envelope);
      console.log(info.messageId);
    }
  );
}
