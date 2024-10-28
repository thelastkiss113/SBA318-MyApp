const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true }
});

module.exports = mongoose.model('Grade', GradeSchema);
