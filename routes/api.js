const express = require('express');
const router = express.Router();

// Sample in-memory grades data
const grades = [
    { id: 1, name: 'John Doe', score: 95 },
    { id: 2, name: 'Jane Smith', score: 89 },
    { id: 3, name: 'Alice Johnson', score: 76 }
];

// GET /api/grades - Fetch all grades
router.get('/grades', (req, res) => {
    res.json(grades);
});

// POST /api/grades - Add a new grade
router.post('/grades', (req, res) => {
    const { name, score } = req.body;

    // Basic validation
    if (!name || score == null) {
        return res.status(400).json({ message: 'Name and score are required' });
    }

    const newGrade = {
        id: grades.length + 1, // Simple ID generation
        name,
        score
    };

    grades.push(newGrade); // Add to in-memory array
    res.status(201).json(newGrade); // Respond with the new grade
});

// PUT /api/grades/:id - Update a grade
router.put('/grades/:id', (req, res) => {
    const { id } = req.params;
    const { name, score } = req.body;

    const gradeIndex = grades.findIndex(g => g.id == id);
    if (gradeIndex === -1) {
        return res.status(404).json({ message: 'Grade not found' });
    }

    // Update the grade
    if (name) grades[gradeIndex].name = name;
    if (score != null) grades[gradeIndex].score = score;

    res.json(grades[gradeIndex]);
});

// DELETE /api/grades/:id - Delete a grade
router.delete('/grades/:id', (req, res) => {
    const { id } = req.params;
    const gradeIndex = grades.findIndex(g => g.id == id);
    
    if (gradeIndex === -1) {
        return res.status(404).json({ message: 'Grade not found' });
    }

    grades.splice(gradeIndex, 1); // Remove the grade
    res.status(204).send(); // Respond with no content
});

module.exports = router;
