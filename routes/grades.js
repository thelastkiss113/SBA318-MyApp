const express = require('express');
const router = express.Router();

// Sample in-memory data structure to store grades
let grades = [
    { id: 1, grade: "A" },
    { id: 2, grade: "B" }
];

// GET all grades
router.get('/', (req, res) => {
    res.status(200).json(grades);
});

// POST a new grade
router.post('/', (req, res) => {
    const { grade } = req.body; // Expecting the new grade in the request body
    const newGrade = {
        id: grades.length + 1, // Auto-increment ID
        grade: grade
    };
    grades.push(newGrade);
    res.status(201).json(newGrade);
});

// PUT to update an existing grade
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { grade } = req.body;

    const gradeIndex = grades.findIndex(g => g.id === parseInt(id));
    if (gradeIndex === -1) {
        return res.status(404).json({ message: 'Grade not found' });
    }

    grades[gradeIndex].grade = grade;
    res.status(200).json(grades[gradeIndex]);
});

// DELETE a grade
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const gradeIndex = grades.findIndex(g => g.id === parseInt(id));
    
    if (gradeIndex === -1) {
        return res.status(404).json({ message: 'Grade not found' });
    }

    const deletedGrade = grades.splice(gradeIndex, 1);
    res.status(204).json(deletedGrade);
});

module.exports = router;
