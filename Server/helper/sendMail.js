const nodemailer = require("nodemailer");

const sendMail = async (to, subject ,text , html) => {


  // Create a transporter using Gmail SMTP
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "anshivam18@gmail.com",
      pass: "udod lyey tmbt hpzy"
    },
  });

  // Rest of your email sending code
  // ...

  // Send the email
   await transporter.sendMail({
    from: 'anshivam18@gmail.com', // Sender's address
    to: to, // Recipient's address
    subject: subject, // Subject line
    text: text, // Plain text body
    html // HTML body
  });

  // console.log("Message sent: %s", info.messageId);
//   res.json(info);
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
};

module.exports = sendMail;
