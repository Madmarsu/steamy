let Groups = require('../models/group');
let Users = require('../models/user');
let Chats = require('../models/chat');

export default {
    getSpecificChat: {
        path: '/chat/:id',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Go to specific chat'
            Chats.find({ destination: req.params.id }).populate("member")
                .then(chat => {
                    res.send(handleResponse(action, chat))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    sendMessage: {
        path: '/chat/:id/send',
        reqType: 'post',
        method(req, res, next) {
            let target = req.params.id
            let action = 'Send message'
            let personal = req.body.personal || false
            let userId = req.session.uid
            console.log(req.session)
            if (personal) {
                Users.findById(userId)
                    .then(user => {
                        console.log("we made it!")
                        let foundFriend = false
                        user.friends.forEach(friend => {
                            console.log("this shit", friend)
                            if (friend == target) {
                                // Send socket message to friend!
                                console.log("We did stuff")
                                foundFriend = true
                            }
                        })

                        if (foundFriend) {
                            Chats.create({ destination: target, member: req.session.uid, message: req.body.message }).then(chat => {
                                console.log("chat", chat)
                                res.send(handleResponse(action, chat))
                            })
                            return
                        }
                        console.log("loser!")
                        return res.send(handleResponse('friend not found', {}))
                    })
                    .catch(error => {
                        return next(handleResponse(action, null, error))
                    })
            }
            else { }
        }
    }
}

function handleResponse(action, data, error) {
    var response = {
        action: action,
        data: data
    }
    if (error) {
        response.error = error;
    }
    return response;
}