let Groups = require('../models/group');
let Users = require('../models/user');
let Chats = require('../models/chat');

export default {
    createGroup: {
        path: '/group/create',
        reqType: 'post',
        method(req, res, next) {
            let action = 'Create group'
            Groups.create(req.body)
                .then(group => {
                    group.members.push(req.session.uid);
                    group.save()
                        .then(group => {
                            Users.findById(req.session.uid)
                                .then(user => {
                                    user.groups.push(group._id);
                                    user.save();
                                    res.send(handleResponse(action, group))
                                })
                        })
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    findGroupByGame: {
        path: '/group/findbygame',
        reqType: 'post',
        method(req, res, next) {
            let action = 'Find groups by game'
            Groups.find({ game: req.body.game })
                .then(groups => {
                    let sortedGroups = groups.sort(function (a, b) {
                        return b.members.length - a.members.length
                    })
                    res.send(handleResponse(action, sortedGroups))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    findGroupByTitle: {
        path: '/group/findbytitle',
        reqType: 'post',
        method(req, res, next) {
            let action = 'Find groups by title'
            Groups.find({ title: req.body.title })
                .then(groups => {
                    let sortedGroups = groups.sort(function (a, b) {
                        return b.members.length - a.members.length
                    })
                    res.send(handleResponse(action, sortedGroups))
                })
                .catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    getSpecificGroup: {
        path: '/group/:id',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Go to specific group'
            Groups.findById(req.params.id).populate('chatHistory', 'members')
                .then(group => {
                    res.send(handleResponse(action, group))
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