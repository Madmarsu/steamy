let Groups = require('../models/group');
let Users = require('../models.user');
let Chats = require('../models.chat');

export default {
    createGroup: {
        path: '/group/create',
        reqType: 'post', 
        method(req, res, next){
            let action = 'Create group'
            Groups.create(req.body)
            .then(group=>{
                res.send(handleResponse(action, group))
            })
            .catch(error=>{
                return next(handleResponse(action, null, error))
            })
        }
    },
    deleteGroup: {
        path: '/group/remove',
        reqType: 'delete',
        method: ''
    }
}

function handleResponse(action, data, error){
    var response = {
        action: action,
        data: data
    }
    if(error){
        response.error = error;
    }
    return response;
}