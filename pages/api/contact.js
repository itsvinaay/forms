import nodemailer from "nodemailer";
export default async (req, res) => {
  const { name, email, message, phone } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  try {
    const emailRes = await transporter.sendMail({
      from: req.body.email,
      to: "776vinay@gmail.com",
      subject: `Contact form submission from ${req.body.name}`,
      html: `<p>You have a new contact form submission</p><br><p><strong>Name: </strong> ${name} </p><br><p><strong>Phone: </strong> ${req.body.phone} </p><br><p><strong>Message: </strong> ${req.body.message} </p><br> `,
    });

    console.log("Message Sent");
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(req.body);
};
