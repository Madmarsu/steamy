let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let bcrypt = require('bcryptjs');
const SALT_FACTOR = 10;
import { models } from '../config/constants'

let schema = new Schema({
    // Relations
    players: [{ type: ObjectId, ref: models.user.name }]
    
})

module.exports = mongoose.model(models.chat.name, schema)