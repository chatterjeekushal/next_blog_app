
// import { resend } from '@/lib/resend';
// import {ApiResponce} from '@/types/ApiResponce';

// export async function sendVerifyEmail(email:string,username:string,otp:string):Promise<ApiResponce>{

//   try {
//       await resend.emails.send({
//           from: 'Acme <onboarding@resend.dev>',
//           to: email,
//           subject: 'Verify your email address by otp ',
//           html: `<strong>username ${username}, email : ${email}, yourotp: ${otp}</strong>`, 
//       });

//       return {
//           success:true,
//           message:"Verification email sent"
//       }
//   } catch (emailError) {

//     console.log("error in sending email",emailError);

//     return {
//         success:false,
//         message:"Failed to send verification email"
//     }
//   }
// }

import nodemailer from "nodemailer";

const mailSender = async ( email: string, username: string, verifyCode: string) => {

  // Create a Transporter to send emails

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'chatterjeekushal448@gmail.com',
        pass: 'drlz bmfi kkia dwkv ' // use environment variables for credentials
      }
    });
  
    const mailOptions = {
      from: 'chatterjeekushal448@gmail.com',
      to: email,
      subject: 'salehub.com',
      html: `
        Hi ${username}, welcome to <b>kushalblog</b> for trending blog here.<br><br>
        ${username}, thank you for registering on our website. Please verify your email.<br><br>
        Your verification email OTP is <b>${verifyCode}</b>.
    `
    };
  
    const info = await transporter.sendMail(mailOptions);
    console.log("Email has been sent:", info.response);
  } catch (error) {
    console.log("Mail error:", error);
  }

}

export default mailSender