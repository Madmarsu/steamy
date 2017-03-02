let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let bcrypt = require('bcryptjs');
const SALT_FACTOR = 10;
import { models } from '../config/constants'

let schema = new Schema({
    username: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
    password: { type: String, required: true },
    steamdId: { type: String },
    games: [{ type: Object }],
    invites: [{ type: Object }],
    // Relations
    friends: [{ type: ObjectId, ref: models.user.name }],
    groups: [{ type: ObjectId, ref: models.group.name }]
})

schema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err){
            return next(err);
        } else {
            bcrypt.hash(user.password, salt, function(err, hash){
                user.password = hash;
                next();
            });
        }
    });
});

schema.methods.validatePassword = function(password){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, isMatch){
            if(err || !isMatch){
                return reject(err);
            }
            return resolve(isMatch);
        });
    })
}

module.exports = mongoose.model(models.user.name, schema)