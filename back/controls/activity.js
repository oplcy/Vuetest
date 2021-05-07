let sql = require('../sql/sql');
let moment = require('moment');
let bcrypt = require('bcryptjs');
let func = require('../sql/func');

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        let start = moment(row.start_time).format('YYYY-MM-DD');
        let end = moment(row.end_time).format('YYYY-MM-DD');

        return Object.assign({}, row, {create_time: date, start_time: start, end_time: end});
    });
}

module.exports = {

    fetchAll (req, res) {
        func.connPool(sql.queryAll, 'activity', (err, rows) => {
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', activities: rows});
        });

    },

    fetchById (req, res){
        let id = req.body.id;
        func.connPool("SELECT * FROM activity where id =", [id], (err, rows) => {
            res.json({code: 200, msg: 'ok', activity: rows[0]});
        });
    },

    // 添加活动
    addOne (req, res) {
        let name = req.body.name;
        let creator = req.body.creator;
        let info = req.body.info;
        let club_id = 0;
        let start_time = moment(req.body.start_time).format('YYYY-MM-DD hh:mm:ss');
        let end_time = moment(req.body.end_time).format('YYYY-MM-DD hh:mm:ss');
        let query = 'INSERT INTO activity(name, creator, club_id, info, start_time, end_time) VALUES(?, ?, ?, ?, ?, ?)';

        let arr = [name, creator, club_id, info, start_time, end_time];
        func.connPool(query, arr, (err, rows) => {
            res.json({code: 200, msg: 'done'});
        });

    },


    // 删除活动
    deleteOne (req, res) {

        let id = req.body.id;
        func.connPool(sql.del, ['activity', id], (err, rows) => {
            if(err){
                console.log('[DELETE ERROR] - ',err.message);
                return;
            }    
            res.json({code: 200, msg: 'done'});
        });

    },

    // 批量删除activity
    deleteMulti (req, res) {
        let id = req.body.id;

        func.connPool('DELETE FROM activity WHERE id IN ?', [[id]], rows => {
            res.json({code: 200, msg: 'done'});
        });

    }
};