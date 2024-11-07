import * as nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';

configDotenv();
export async function sendEmail(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({ from: process.env.EMAIL, to, subject, text });
}
