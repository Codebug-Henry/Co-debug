const { User, Question, Answer, MacroTag, MicroTag, SubAnswer } = require("../db.js");
const { questionTags, paginate } = require("./generalControllers.js");

const deleteUserQuestion = async (req, res, next) => {
  const { id } = req.params;

  try {
    const questionDeleted = await Question.findByPk(id);

    const userDeleter = await User.findByPk(questionDeleted.userSub);

    await userDeleter.update({ cantQuest: userDeleter.cantQuest - 1 });

    await questionDeleted.destroy();

    res.send("borrado correctamente");
  } catch (error) {
    next(error);
  }
};

const putUserQuestion = async (req, res, next) => {
  let {
    id,
    text,
    title,
    like,
    statusDeleted,
    macroTags,
    microTags,
    sub,
  } = req.body;

  const question = await Question.findByPk(id);
  const userQues = await question.getUser();
  const answersQues = await question.getAnswers();
  const userLogged = await User.findByPk(sub);

  // const newFavourites = [...user.favourites, id]

  //         await user.update({
  //             favourites: newFavourites,
  //             cantFav: user.cantFav + 1
  //         })

  let newLikes = question.likes;

  if (like === "add") {
    let likedSet = new Set(userLogged.questLiked);
    let dislikedSet = new Set(userLogged.questDisliked);

    if (dislikedSet.has(id)) {
      dislikedSet.delete(id);
      await userLogged.update({ questDisliked: [...dislikedSet] });
      newLikes++;
    } else if (!likedSet.has(id)) {
      likedSet.add(id);
      await userLogged.update({ questLiked: [...likedSet] });
      newLikes++;
    }
  } else if (like === "remove") {
    let likedSet = new Set(userLogged.questLiked);
    let dislikedSet = new Set(userLogged.questDisliked);

    if (likedSet.has(id)) {
      likedSet.delete(id);
      await userLogged.update({ questLiked: [...likedSet] });
      newLikes--;
    } else if (!dislikedSet.has(id)) {
      dislikedSet.add(id);
      await userLogged.update({ questDisliked: [...dislikedSet] });
      newLikes--;
    }
  }

  try {
    // if(macroTags){
    //     macroTags=await MacroTag.findAll({where:{id:macroTags}})
    //     let oldMacroTags=await question.getMacroTags()
    //     await question.removeMacroTags(oldMacroTags)
    //     macroTags=await questionTags(macroTags, MacroTag, question)
    // }

    // if(microTags){
    //     microTags=await MicroTag.findAll({where:{id:microTags}})
    //     let oldMicroTags=await question.getMicroTags()
    //     await question.removeMicroTags(oldMicroTags)
    //     microTags=await questionTags(microTags, MicroTag, question)
    // }

    if (statusDeleted) {
      let promise = userQues.update({ cantQuest: userQues.cantQuest - 1 });
      let arrPromises1 = answersQues.map((ans) => {
        ans.update({ statusDeleted: true });
      });
      let arrPromises2 = answersQues.map((ans) => {
        ans
          .getUser()
          .then((userAns) => userAns.update({ cantAns: userAns.cantAns - 1 }));
      });
      let arrPromises = [promise, ...arrPromises1, ...arrPromises2];
      await Promise.all(arrPromises);
    }

    await Question.update(
      { text, title, likes: newLikes, statusDeleted },
      {
        where: {
          id: parseInt(id),
        },
      }
    );

    res.send({
      macroTags,
      microTags,
      text,
      title,
      likes: newLikes,
      statusDeleted,
    });
  } catch (error) {
    next(error);
  }
};

const postQuestion = async (req, res, next) => {
  let { sub, text, title, macroTags, microTags } = req.body;
  try {
    const user = await User.findByPk(sub);
    await user.update({ cantQuest: user.cantQuest + 1 });
    const newQuestion = await Question.create({ text, title });

    macroTags = await questionTags(macroTags, MacroTag, newQuestion);
    microTags = await questionTags(microTags, MicroTag, newQuestion);
    newQuestion.setUser(user);
    res.send({ user, ...newQuestion.dataValues, macroTags, microTags });
  } catch (error) {
    next(error);
  }
};

const getSingleQuestion = async (req, res, next) => {
  const id = req.params.id;
  const { page, limit } = req.query;

  try {
    let question = await Question.findByPk(id, {
      include: [
        { model: User },
        {
          model: Answer,
          required: false,
          where: { statusDeleted: false },
          include: [
            { model: User },
            { 
              model: SubAnswer,
              required: false,
              include: User
            }
          ]
        },
        { model: MacroTag },
        { model: MicroTag },
      ],
      order: [
        [Answer, "statusValidated", "DESC"],
        [Answer, "createdAt", "ASC"],
        [Answer, "text", "DESC"],
      ],
    });

    const answers = paginate(parseInt(limit), parseInt(page), question.answers);

    question = {
      ...question.dataValues,
      teachPoints: question.teachPoints,
      answers,
    };

    res.send(question);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteUserQuestion,
  putUserQuestion,
  postQuestion,
  getSingleQuestion,
};
