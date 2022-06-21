import { combineReducers } from 'redux';
import question from './question';
import questions from './questions';
import answer from './answer';
import answers from './answers';
import user from './user';
import topTenRanking from './topTenRanking';

export default combineReducers({ question, questions, answer, answers, user, topTenRanking });