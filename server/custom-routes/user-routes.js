let Groups = require('../models/group');
let Users = require('../models/user');
let Chats = require('../models/chat');

export default {
    sendInvite: {
        path: '/profile/:id/invite',
        reqType: 'put',
        method(req, res, next){
            let action = 'Send invite'
            Users.findById(req.params.id)
            .then(user=>{
                user.invites.push(req.body)
            })
        }
    },
    acceptInvite: {
        path: '/invite/accept',
        reqType: 'put',
        method(req, res, next){
            let action = 'Accept invite'
            Users.findById(req.sessions.uid)
            .then(user=>{
                user.friends.push(req.body.userId)
                let index = user.invites.indexOf(req.body)
                user.invites.splice(index, 1)
                user.save()
                Users.findById(req.body.userId)
                .then(friendUser =>{
                    friendUser.friends.push(req.session.uid)
                    friendUser.save()
                })
            })
            .catch(error=>{
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