
import { combineReducers } from "redux";
import question from "./question";
import questions from "./questions";
import answer from "./answer";
import answers from "./answers";
import user from "./user";
import topTenRanking from "./topTenRanking";
import favourites from "./favourites";
import ranking from "./ranking";
import pages from "./pages";
import userQuestions from "./userQuestions";
import users from "./users";
import totalPages from "./totalPages";
import message from "./message";
import messages from "./messages";
import tags from './tags';
import admins from "./admins";
import usersNoAdmin from "./usersNoAdmin";
import alerts from "./alerts";
import sort from "./sort";
import sortValidate from "./sortValidate";

export default combineReducers({
  message,
  users,
  question,
  questions,
  answer,
  answers,
  user,
  topTenRanking,
  favourites,
  ranking,
  pages,
  totalPages,
  userQuestions,
  messages,
  tags,
  admins,
  usersNoAdmin,
  alerts,
  sort,
  sortValidate
});
