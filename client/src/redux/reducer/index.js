import { combineReducers } from 'redux';
import question from './question';
import questions from './questions';
import answer from './answer';
import answers from './answers';
import user from './user';
import topTenRanking from './topTenRanking';
import favourites from './favourites';
import ranking from './ranking'
import pages from './pages'

export default combineReducers({ question, questions, answer, answers, user, topTenRanking, favourites, ranking, pages });