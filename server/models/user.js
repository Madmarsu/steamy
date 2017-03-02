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
    // Relations
    friends: [{ type: ObjectId, ref: models.user }],
    invites: [{ type: Object }]
    
})