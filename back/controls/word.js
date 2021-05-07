let sql = require('../sql/sql');
let moment = require('moment');
let bcrypt = require('bcryptjs');
let func = require('../sql/func');

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        

        return Object.assign({}, row, {create_time: date});
    });
}

module.exports = {

    fetchAll (req, res) {
        func.connPool(sql.queryAll, 'word', (err, rows) => {
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', words: rows});
        });

    },

    fetchList (req, res) {
        func.connPool('select * from word order by create_time desc', [], (err, rows) => {
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', words: rows});
        });

    },

    fetchById (req, res){
        let id = req.body.id;
        func.connPool("SELECT * FROM word where id =", [id], (err, rows) => {
            res.json({code: 200, msg: 'ok', word: rows[0]});
        });
    },

    // 添加留言
    addOne (req, res) {
        let context = req.body.context;
        let user_id = req.body.user_id;
        let query = 'INSERT INTO word(context, user_id) VALUES(?, ?)';

        let arr = [context, user_id];
        func.connPool(query, arr, (err, rows) => {
            res.json({code: 200, msg: 'done'});
        });

    },


    // 删除留言
    deleteOne (req, res) {

        let id = req.body.id;
        func.connPool(sql.del, ['word', id], (err, rows) => {
            if(err){
                console.log('[DELETE ERROR] - ',err.message);
                return;
            }    
            res.json({code: 200, msg: 'done'});
        });

    }
};