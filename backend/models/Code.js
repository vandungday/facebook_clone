const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const codeSchema = new Schema({
  code: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Code', codeSchema);
