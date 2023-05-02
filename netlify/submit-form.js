// exports.handler = async (event) => {
//     const { name, email, message } = JSON.parse(event.body);

//     // Do something with the form data, such as send it to a database or send an email
//     return {
//         statusCode: 200,
//         body: JSON.stringify({ message: 'Form submitted successfully!' }),
//     };
// };

const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const OAuth2 = google.auth.OAuth2;

exports.handler = async (event, context) => {

  const { name, email, message } = JSON.parse(event.body);

  const oAuth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });

  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    // service: 'gmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    // auth: {
    //   type: 'OAuth2',
    //   user: 'williamboomerbaker@gmail.com',
    //   clientId: process.env.GMAIL_CLIENT_ID,
    //   clientSecret: process.env.GMAIL_CLIENT_SECRET,
    //   refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    //   accessToken: accessToken
    // }
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: 'vimuthtweet@gmail.com',
    subject: 'Contact Us Data',
    html: `
            <h2>Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
  };

  const result = await transporter.sendMail(mailOptions);

  console.log('ssaas')

  console.log(result)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Email sent successfully' })
  };
};
