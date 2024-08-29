const dotenv = require('dotenv');
const { SendMailClient } = require('zeptomail');
const { html } = require('../../templates/html');
const nodemailer = require('nodemailer');

class Mail {
  zohoEmail = async () => {
    const client = new SendMailClient({
      url: 'https://api.zeptomail.com/',
      token: process.env.ZOHO_EMAIL_TOKEN,
    });

    return client;
  };

  sendEmailNode = async (mailData) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL_USERNAME,
          pass: process.env.NODEMAILER_EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail(mailData, function (error) {
        if (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  };

  sendEmailNodeTemp = async (address, otp, firstName) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL_USERNAME,
          pass: process.env.NODEMAILER_EMAIL_PASSWORD,
        },
      });

      const mailData = {
        from: process.env.NODEMAILER_EMAIL_USERNAME,
        to: address,
        subject: 'OTP for Verification',
        html: html.otp(otp, firstName),
      };

      await transporter.sendMail(mailData, function (error) {
        if (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  };

  otpEmail = async (address, otp, firstName) => {
    try {
      const client = await this.zohoEmail();

      await client.sendMail({
        bounce_address: process.env.ZOHO_BOUNCE_EMAIL,
        from: {
          address: process.env.ZOHO_EMAIL_ADDRESS,
          name: 'Email Verification',
        },
        to: [{ email_address: { address } }],
        subject: 'OTP',
        htmlbody: html.otp(otp, firstName),
      });
    } catch (error) {
      this.emailAdmin('Zoho Mail Error', error);
    }
  };

  emailAdmin = async (subject, message) => {
    const mailData = {
      to: process.env.NODEMAILER_EMAIL_USERNAME,
      from: process.env.NODEMAILER_EMAIL_SENDER,
      subject,
      html: html.admin(subject, message),
    };

    await this.sendEmailNode(mailData);
  };
}
exports.mail = new Mail();
