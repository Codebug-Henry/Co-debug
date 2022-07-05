const { User, Message } = require("../db.js");
const nodemailer = require("nodemailer");
const { GMAIL, GPASS } = process.env;

const postMessage = async (req, res, next) => {
  const { sub, title, text, email } = req.body;

  try {
    const user = await User.findByPk(sub);
    const newMessage = await Message.create({ title, text, email });
    newMessage.setUser(user);

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GMAIL,
        pass: GPASS,
      },
    });
    const mailOptions = {
      from: "Remitente",
      to: email,
      subject: title,
      text: `Tu consulta se envio correctamente con el siguiente mensaje:
            ${text}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Email enviado");
      }
    });

    res.send({ user, ...newMessage.dataValues });
  } catch (error) {
    next(error);
  }
};

const putMessage = async (req, res, next) => {
  const { id, title, answer, email } = req.body;

  try {
    const message = await Message.findByPk(id);
    await message.update({ answer });

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GMAIL,
        pass: GPASS,
      },
    });
    const mailOptions = {
      from: "Remitente",
      to: email,
      subject: title,
      text: answer,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Email enviado");
      }
    });

    res.send({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postMessage,
  putMessage,
};
