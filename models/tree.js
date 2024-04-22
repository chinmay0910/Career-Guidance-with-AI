const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  id: String,
  children: [mongoose.Schema.Types.Mixed] // Allows for nested children
});

const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;
