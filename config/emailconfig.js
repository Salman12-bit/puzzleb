import nodemailer from "nodemailer";
import Usergame from "../models/Usergame.js";

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'yahoo', 'hotmail', etc.
  auth: {
    user: 'msalman39707@gmail.com',
    pass: 'your-email-password' // Replace with your actual password or app-specific password
  }
});
 
const sendMail = async (req, res) => {
  try {
    // Fetch user data from the database
    let userData = await Usergame.findOne({ _id: req.params.id });
    if (!userData) {
      return res.status(404).send('User not found');
    }
    
    const { email, name, address, day, time, city, zip } = userData;

    // Set up mail options
    const mailOptions = {
      from: 'msalman39707@gmail.com',
      to: email,
      subject: `Information for ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Address: ${address}
        Day: ${day}
        Time: ${time}
        City: ${city}
        Zip: ${zip}
      `
    };

    // Send the email
     transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send('Error In Sending Email');
      } else {
        return res.status(200).send('Email Sent Successfully');
      }
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export default sendMail;


















// import nodemailer from "nodemailer";
// import Usergame from "../models/Usergame.js";

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // You can use other services like 'yahoo', 'hotmail', etc.
//   auth: {
//     user: 'msalman39707@gmail.com',
//     pass: 'your-email-password'
//   }
// });
 
// const sendMail = async (to, subject, text) => {
//   let Data = await Usergame.findOne({ _id: req.params.id })
//   let sentemail = await Usergame.findOne({email })
//   const {name,mail, address, day, time, city, zip} = req.body;
    
//   const mailOptions = {
//     from: 'msalman39707@gmail.com',
//     to, sentemail,
//     subject, name,mail, address, day, time, city, zip,
//     text
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error occurred:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// export default sendMail;
