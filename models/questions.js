const mongoose = require('mongoose');

// Define a schema for the questions
const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  selectName: {
    type: String,
    required: true
  },
  options: [{
    text: String,
    value: Number // Score for this option
  }]
});

// Define a model for the questions
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
