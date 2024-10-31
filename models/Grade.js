// models/Grade.js
const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
