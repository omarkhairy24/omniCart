const nodemailer = require('nodemailer');

const sendEmail = async options =>{
    const transporter = nodemailer.createTransport({
        service:process.env.SERVICE,
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure:false,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: '<hello>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;