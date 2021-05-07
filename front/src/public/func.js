import axios from "axios";

export default {
    ajaxGet (api, param, cb) {
        axios.get(api, param)
            .then(cb)
            .catch(err => {
                console.log(err);
            })
    },
    ajaxPost (api, post, cb) {
        axios.post(api, post)
            .then(cb)
            .catch(err => {
                console.log(err);
            })
    },
}