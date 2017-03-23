let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let bcrypt = require('bcryptjs');
const SALT_FACTOR = 10;
import { models } from '../config/constants'

let schema = new Schema({
    username: { type: String, required: true },
    userId: { type: ObjectId, ref: models.user.name },
    content: { type: String, required: true }
})

module.exports = mongoose.model(models.message.name, schema)