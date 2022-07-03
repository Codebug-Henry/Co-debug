const nodemailer = require('nodemailer')
const { User } = require('../db')
const { getUserPosition, checkEmailAdmin } = require('./generalControllers')
const {
    GMAIL, GPASS,
  } = process.env;

const getUserInfo = async (req, res, next) => {
    const sub = req.params.sub
    try {
        const myPosition = await getUserPosition(sub)
        const user = await User.findByPk(sub)
        res.send({ ...user.dataValues, myPosition })
    } catch (error) {
        next(error)
    }
}

const postUser = async (req, res, next) => {
    try {
        let user = await User.findByPk(req.body.sub)
        if (!user) {
            if (checkEmailAdmin(req.body)) user = await User.create({...req.body, statusAdmin: true})
            else user = await User.create(req.body)
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
                to: user.email,
                subject: "Loggin exitoso",
                text: "Usted se ha logeado correctamente a Co-Debug"
            }

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.log(error.message);
                } else {
                    console.log("Email enviado")
                }
            });
        }

        const myPosition = await getUserPosition(user.sub)

        res.send({ ...user.dataValues, myPosition })
    } catch (error) {
        next(error)
    }
}

const putUserInfo = async (req, res, next) => {
    const { sub } = req.params
    let { name, nickname, picture, myTeachPoints, nameChanges, statusAdmin, statusBanned, statusDeleted } = req.body

    try {
        if (name) nameChanges = nameChanges + 1

        await User.update({ name, nickname, picture, myTeachPoints, nameChanges, statusAdmin, statusBanned, statusDeleted }, {
            where: {
                sub: (sub)
            }
        })

        let userUpdated = await User.findByPk(sub)

        if (statusDeleted) {
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
                to: userUpdated.email,
                subject: "Usuario eliminado",
                text: "Su cuenta en Co-Debug ha sido eliminada correctamente"
            }

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.log(error.message);
                } else {
                    console.log("Email enviado")
                }
            });
        }

        res.send({ userUpdated })
    } catch (error) {
        next(error)
    }
}


const deleteUser = async (req, res, next) => {
    const { sub } = req.params

    try {
        await User.destroy({
            where: {
                sub: (sub)
            }
        })
        res.send("el usuario ha sido eliminado correctamente")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUserInfo,
    postUser,
    putUserInfo,
    deleteUser
}