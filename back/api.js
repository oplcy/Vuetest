let path = '/api';

module.exports = {
    // activity
    activityList: path + '/activity/list',
    activityDetail: path + '/activity/detail',
    activityDelete: path + '/activity/delete',
    activityAdd: path + '/activity/add',

    //club
    clubList: path + '/club/list',
    clubs: path + '/club/findlist',
    clubDetail: path + '/club/detail',
    clubDelete: path + '/club/delete',
    deleteClubUser: path + '/club/deleteClubUser',
    update: path + '/club/update',
    updateClubUser: path + '/club/updateClubUser',
    joinClub: path + '/club/joinClub',
    clubAdd: path + '/club/add',


    // word
    wordList: path + '/word/list',
    wordDelete: path + '/word/delete',
    wordAdd: path + '/word/add',
    

    // user
    userList: path + '/user/list',
    userDetail: path + '/user/detail',
    userUpdate: path + '/user/update',
    userDelete: path + '/user/delete',
    userRegister: path + '/user/register',
    userLogin: path + '/user/login',
    userLogout: path + '/user/logout',
    userAutoLogin: path + '/user/auto-login'
};