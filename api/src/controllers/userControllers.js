const { User } = require("../db");
const {
  getUserPosition,
  checkEmailAdmin,
  sendEmail,
  checkNickname,
} = require("./generalControllers");

const getUserInfo = async (req, res, next) => {
  const sub = req.params.sub;
  try {
    const myPosition = await getUserPosition(sub);
    const user = await User.findByPk(sub);
    res.send({ ...user.dataValues, myPosition });
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.body.sub);
    if (!user) {
      if (checkEmailAdmin(req.body))
        user = await User.create({ ...req.body, statusAdmin: true });
      else user = await User.create(req.body);

      let to = user.email;
      let subject = "Login exitoso";
      let text = "Usted se ha logueado correctamente a Co-Debug";

      sendEmail(to, subject, text);
    }

    const myPosition = await getUserPosition(user.sub);

    res.send({ ...user.dataValues, myPosition });
  } catch (error) {
    next(error);
  }
};

const putUserInfo = async (req, res, next) => {
  const { sub } = req.params;
  let {
    name,
    nickname,
    picture,
    myTeachPoints,
    nameChanges,
    statusAdmin,
    statusBanned,
    statusDeleted,
  } = req.body;

  try {
    // if (nickname && await checkNickname(nickname) !== null) throw "El nickname ya existe";
    if (nickname) {
      nameChanges = nameChanges + 1;
      //console.log(await checkNickname(nickname));
    }

    await User.update(
      {
        name,
        nickname,
        picture,
        myTeachPoints,
        nameChanges,
        statusAdmin,
        statusBanned,
        statusDeleted,
      },
      {
        where: {
          sub: sub,
        },
      }
    );

    let userUpdated = await User.findByPk(sub);

    if (statusDeleted) {
      let to = userUpdated.email;
      let subject = "Usuario eliminado";
      let text = "Su cuenta en Co-Debug ha sido eliminada correctamente";

      sendEmail(to, subject, text);
    }

    res.send({ userUpdated });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { sub } = req.params;

  try {
    await User.destroy({
      where: {
        sub: sub,
      },
    });
    res.send("el usuario ha sido eliminado correctamente");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserInfo,
  postUser,
  putUserInfo,
  deleteUser,
};
