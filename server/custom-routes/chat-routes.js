let Groups = require('../models/group');
let Users = require('../models/user');
let Chats = require('../models/chat');
let Messages = require('../models/message');

export default {
    getSpecificChat: {
        path: '/chat/:id',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Go to specific chat'
             var opts = [
                { path: 'chatHistory'}
                , { path: 'members', select: '_id username avatar steamId' }
            ]
            Chats.findById(req.params.id).populate(opts)
                .then(chat => {
                    chat.members.forEach(member => {
                        member.password = null
                    })
                    if (chat.chatHistory.length > 50) {
                        chat.chatHistory = chat.chatHistory.slice(chat.chatHistory.length - 50, 50)
                    }
                    res.send(handleResponse(action, chat))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    sendChatMessage: {
        path: '/chat/:id/send',
        reqType: 'post',
        method(req, res, next) {
            let action = 'send chat message'
            Messages.create({
                username: req.body.username,
                userId: req.session.uid,
                content: req.body.message
            }).then(message => {
                Chats.findById(req.params.id)
                    .then(chat => {
                        chat.chatHistory.push(message._id)
                        chat.save()
                        res.send(handleResponse(action, message))
                    })
            })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    // createInitialChat: {
    //     path: '/profile/:id/chat',
    //     reqType: 'post',
    //     method(req, res, next) {
    //         let action = 'create initial chat'
    //         Chats.create({ members: req.session.uid })
    //             .then(newChat => {
    //                 newChat.members.push(req.params.id);
    //                 newChat.save()
    //                     .then(chat => {
    //                     Chats.findById(chat._id).populate('members')
    //                         .then(chat => {
    //                             res.send(handleResponse(action, chat))
    //                         })
    //                 })
    //             })
    //             .catch(error => {
    //                 return next(handleResponse(action, null, error))
    //             })
    //     }
    // },
    createChat: {
        path: '/profile/:id/chat',
        reqType: 'post',
        method(req, res, next) {
            let action = 'Create new chat'
             var opts = [
                { path: 'chatHistory'}
                , { path: 'members', select: '_id username avatar steamId' }
            ]
            Chats.findOne({ $and: [{ members: { $in: [req.session.uid] }},{ members: { $in: [req.params.id] }}] }).populate(opts)
                .then(chat => {
                    if (!chat) {
                        Chats.create({ members: req.session.uid })
                            .then(newChat => {
                                newChat.members.push(req.params.id);
                                newChat.save()
                                    .then(chat => {
                                        Chats.findById(chat._id).populate('members')
                                            .then(chat => {
                                                res.send(handleResponse(action, chat))
                                            })
                                    })
                            })
                    } else {
                        res.send(handleResponse(action, chat))
                    }
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
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





    // sendMessage: {
    //     path: '/chat/:id/send',
    //     reqType: 'post',
    //     method(req, res, next) {
    //         let target = req.params.id
    //         let action = 'Send message'
    //         let personal = req.body.personal || false
    //         let userId = req.session.uid
    //         console.log(req.session)
    //         if (personal) {
    //             Users.findById(userId)
    //                 .then(user => {
    //                     console.log("we made it!")
    //                     let foundFriend = false
    //                     user.friends.forEach(friend => {
    //                         console.log("this shit", friend)
    //                         if (friend == target) {
    //                             // Send socket message to friend!
    //                             console.log("We did stuff")
    //                             foundFriend = true
    //                         }
    //                     })

    //                     if (foundFriend) {
    //                         Chats.create({ destination: target, member: req.session.uid, message: req.body.message }).then(chat => {
    //                             console.log("chat", chat)
    //                             res.send(handleResponse(action, chat))
    //                         })
    //                         return
    //                     }
    //                     console.log("loser!")
    //                     return res.send(handleResponse('friend not found', {}))
    //                 })
    //                 .catch(error => {
    //                     return next(handleResponse(action, null, error))
    //                 })
    //         }
    //         else { }
    //     }
    // }