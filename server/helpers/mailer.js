let nodemailer = require('nodemailer');
let environment = process.env;

const gmailTransport = nodemailer.createTransport({
  service: environment.GMAIL_SERVICE_NAME,
  host: environment.GMAIL_SERVICE_HOST,
  secure: environment.GMAIL_SERVICE_SECURE,
  port: environment.GMAIL_SERVICE_PORT,
  auth: {
    user: environment.GMAIL_USER_NAME,
    pass: environment.GMAIL_USER_PASSWORD
  }
});


function sendEmail( emailTo , body , cb ) {

  let HelperOptions = {
    from: '"Fancy Todo" <no-reply@gmail.com>',
    to: emailTo,
    subject: 'Welcome to FANCY TODO!!',
    text: body
  };

  gmailTransport.sendMail(HelperOptions, (error, info) => {
    if (error) {
      cb( error )
    } else {
      cb()
    }
  });
}

module.exports = sendEmail
