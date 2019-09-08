const axios = require('axios')
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_API_KEY
sgMail.Apikey = apiKey

class ApiController {
  static sendEmail(req, res) {
    console.log(sgMail);
    const msg = {
      to: 'ayusudi.abc@gmail.com',
      from: 'ayusudi.abcd@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg).then(data =>{
      res.send(data)
    })
  //  const message = { 
  //   to : 'ayusudi.abc@gmail.com', 
  //   from : { email : 'ayusudi.abc@gmail.com' , name: 'Name of user you want to  send email as'},
  //   message : `Hi there, ayu`,
  //   subject : "This is a test Email"
  //   }
  //   sgMail.send(message).then((sent) => {
  //     res.send('oke')
  //     console.log('her');
  //     // Awesome Logic to check if mail was sent
  //   })
   }
  
}

module.exports = ApiController
