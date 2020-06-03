
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BearSchema = new Schema({
  name: String
});

const Bear = mongoose.model('Bear', BearSchema);
module.exports = Bear;