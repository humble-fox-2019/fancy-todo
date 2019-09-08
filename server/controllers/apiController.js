const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_API_KEY
sgMail.setApiKey(apiKey)


class ApiController {
  static sendHtml(req, res) {
    let to = req.decoded.email
    let html = req.body.html
    const msg = {
      to: to,
      from: 'ayusudi.abc@gmail.com',
      subject: 'Fancy Todo is reminding your Todo',
      html: html,
    };
    sgMail.send(msg).then(data =>{
      res.status(200).json({
        message : 'success'
      })
    })
   }
  
}

module.exports = ApiController
