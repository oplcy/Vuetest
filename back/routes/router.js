let express = require('express');
let activity = require('../controls/activity');
let user = require('../controls/user_info');
let club = require('../controls/club');
let word = require('../controls/word');
let api = require('../api');
let upload = require('../utils/upload');


let router = express.Router();

// activity
router.get(api.activityList, activity.fetchAll);
router.post(api.activityDetail, activity.fetchById);
router.post(api.activityAdd, activity.addOne);
router.post(api.activityDelete, activity.deleteOne);


// club
router.get(api.clubList, club.fetchAll);
router.post(api.clubs, club.fetchList);
router.post(api.clubDetail, club.fetchById);
router.post(api.clubAdd, club.addOne);
router.post(api.update, club.update);
router.post(api.updateClubUser, club.updateClubUser);
router.post(api.joinClub, club.joinClub);
router.post(api.clubDelete, club.deleteOne);
router.post(api.deleteClubUser, club.deleteClubUser);


// word
router.get(api.wordList, word.fetchList);
router.post(api.wordAdd, word.addOne);
router.post(api.wordDelete, word.deleteOne);


// user
router.get(api.userList, user.fetchAll);
router.post(api.userDetail, user.fetchById);
router.post(api.userUpdate, user.updateUser);
router.get(api.userLogout, user.logout);
router.get(api.userAutoLogin, user.autoLogin); // 自动登录

router.post(api.userDelete, user.deleteOne);
router.post(api.userLogin, user.login); // 登录
router.post(api.userRegister, user.register); // 注册

module.exports = router;