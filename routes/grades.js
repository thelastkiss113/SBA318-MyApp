//routes/grades.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Grade schema
const gradeSchema = new mongoose.Schema({
    name: String,
    score: Number
});

// Create the Grade model
const Grade = mongoose.model('Grade', gradeSchema);

// GET all grades
router.get('/', async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// GET a grade by ID
router.get('/:id', async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (!grade) return res.status(404).send('Grade not found');
        res.json(grade);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// POST a new grade
router.post('/', async (req, res) => {
    try {
        const newGrade = new Grade(req.body);
        const savedGrade = await newGrade.save();
        res.status(201).json(savedGrade);
    } catch (error) {
        res.status(400).send('Bad Request');
    }
});

// PATCH a grade by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedGrade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGrade) return res.status(404).send('Grade not found');
        res.json(updatedGrade);
    } catch (error) {
        res.status(400).send('Bad Request');
    }
});

// DELETE a grade by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
        if (!deletedGrade) return res.status(404).send('Grade not found');
        res.json(deletedGrade);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
