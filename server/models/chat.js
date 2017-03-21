let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let bcrypt = require('bcryptjs');
const SALT_FACTOR = 10;
import { models } from '../config/constants'

let schema = new Schema({
    // Relations
    destination: {type: String},
    member: { type: ObjectId, ref: models.user.name },
    message: {type: String}
    // chatHistory: [{ type: Schema.Types.Mixed }]
    
})

module.exports = mongoose.model(models.chat.name, schema)