let Groups = require('../models/group');
let Users = require('../models.user');
let Chats = require('../models.chat');

export default {
    gameLists: {
        path: '/',
        reqTpe: 'get'
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