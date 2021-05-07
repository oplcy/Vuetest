let sql = require('../sql/sql');
let moment = require('moment');
let bcrypt = require('bcryptjs');
let func = require('../sql/func');

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        let obj = {};

        switch (row.type) {
            case 0:
                obj.type = '管理员';
                break;
            case 1:
                obj.type = '教师';
                break;
            case 2:
                obj.type = '学生';
        }

        delete row.password;

        return Object.assign({}, row, {create_time: date}, obj);
    });
}

module.exports = {

    fetchAll (req, res) {
        func.connPool(sql.queryAll, 'user_info', (err, rows) => {
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', users: rows});
        });

    },

    // 添加用户
    addOne (req, res) {
        let name = req.body.name;
        let pass = req.body.pass;
        let type = req.body.type;
        let query = 'INSERT INTO user(user_name, password, type) VALUES(?, ?, ?)';

        // 密码加盐
        bcrypt.hash(pass, 10, (err, hash) => {
            if (err) console.log(err);

            pass = hash;

            let arr = [name, pass, role];

            func.connPool(query, arr, rows => {
                res.json({code: 200, msg: 'done'});
            });

        });

    },


    // 删除用户
    deleteOne (req, res) {

        let id = req.body.id;

        func.connPool(sql.del, ['user_info', id], rows => {
            res.json({code: 200, msg: 'done'});
        });

    },

    fetchById (req, res){
        let id = req.body.id;
        func.connPool("SELECT * FROM user_info where id =?", [id], (err, rows) => {
            func.connPool("SELECT * FROM club_user where user_id =?", [id], (err, rows2) => {
                // console.log(rows2);
                rows[0].club_id = 0;
                if(rows2.length >= 1){
                    // req.session.login = user;
                    rows[0].club_id = rows2[0].club_id;
                }
                res.json({code: 200, msg: 'ok', data: rows[0]});
            });
            // res.json({code: 200, msg: 'ok', data: rows[0]});
        });
    },

    // 批量删除
    deleteMulti (req, res) {
        let id = req.body.id;

        func.connPool('DELETE FROM user_info WHERE id IN ?', [[id]], rows => {
            res.json({code: 200, msg: 'done'});
        });

    },

    updateUser (req, res) {
        let id = req.body.id;
        let password = req.body.pass;
        let type = req.body.type;
        // 密码加盐
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) console.log(err);

            password = hash;
            func.connPool("update user_info set type = ?, password = ? where id = ?", [type, password, id], (err, rows) => {
                res.json({code: 200, msg: 'done'});
            });

        });

    },

    // 登录
    login (req, res) {
        let user_name = req.body.user_name;
        let pass = req.body.pass;

        func.connPool('SELECT * from user_info where user_name = ?', [user_name], (err, rows) => {

            if (!rows.length) {
                res.json({code: 400, msg: '用户名不存在'});
                return;
            }

            let password = rows[0].password;
            bcrypt.compare(pass, password, (err, sure) => {
                if (sure) {
                    let user = {
                        user_id: rows[0].id,
                        user_name: rows[0].user_name,
                        type: rows[0].type,
                        club_id: 0
                    };

                    func.connPool("SELECT * FROM club_user where user_id =?", [rows[0].id], (err, rows2) => {
                        console.log(rows2);
                        if(rows2.length >= 1){
                            req.session.login = user;
                            user.club_id = rows2[0].club_id;
                        }
                        res.json({code: 200, msg: '登录成功', user: user});
                    });
                } else {
                    res.json({code: 400, msg: '密码错误'});
                }
            });

        });

    },

    register (req, res) {
        let name = req.body.name;
        let pass = req.body.pass;
        let type = req.body.type;
        let query = 'INSERT INTO user_info(user_name, password, type) VALUES(?, ?, ?)';

        // 密码加盐
        bcrypt.hash(pass, 10, (err, hash) => {
            if (err) console.log(err);

            pass = hash;

            let arr = [name, pass, type];

            func.connPool(query, arr, (err, rows) => {
                console.log(rows);
                res.json({code: 200, msg: 'done'});
            });

        });
    },


    // 自动登录
    autoLogin (req, res) {
        let user = req.session.login;
        if (user) {
            res.json({code: 200, msg: '自动登录', user: user});

        } else {
            res.json({code: 400, msg: 'not found'});
        }
    },

    // 注销
    logout (req, res) {
        req.session.login = null;

        res.json({code: 200, msg: '注销'});
    }
};