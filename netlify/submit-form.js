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
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'williamboomerbaker',
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken
    }
    // service: 'gmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    // auth: {
    //   user: 'williamboomerbaker@gmail.com',
    //   pass: 'iyifviwffawfvwva',
    // },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: 'vimuthtweet@gmail.com',
    subject: 'Test email',
    text: 'This is a test email2'
  };

  const result = await transporter.sendMail(mailOptions);

  console.log(result)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Email sent successfully' })
  };
};
