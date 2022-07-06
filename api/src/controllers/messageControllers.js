const { User, Message } = require("../db.js");
const { sendEmail } = require('./generalControllers')

const postMessage = async (req, res, next) => {
  const { sub, title, text, email } = req.body;

  try {
    const user = await User.findByPk(sub);
    const newMessage = await Message.create({ title, text, email });
    newMessage.setUser(user);

    let to = email
    let subject = title
    let textEmail = `Tu consulta se envió correctamente con el siguiente mensaje:\n\n${text}`

    sendEmail(to, subject, textEmail)

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

    let to = email
    let subject = title
    let text = answer

    sendEmail(to, subject, text)

    res.send({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postMessage,
  putMessage,
};
