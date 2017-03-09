let Groups = require('../models/group');
let Users = require('../models/user');
let Chats = require('../models/chat');

export default {
    getSpecificChat: {
        path: '/chat/:id',
        reqType: 'get',
        method(req, res, next){
            let action = 'Go to specific chat'
            Chats.findById(req.params.id).populate('chatHistory', 'members')
                .then(chat => {
                    res.send(handleResponse(action, chat))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
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