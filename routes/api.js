// routes/api.js
const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');


app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// GET /api/grades - Fetch all grades from the database
router.get('/api/grades', async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grades' });
  }
});

// GET /api/grades/:id - Fetch a grade by ID from the database
router.get('/api/grades/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const grade = await Grade.findById(id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grade' });
  }
});

// POST /api/grades - Add a new grade
router.post('/api/grades', async (req, res) => {
  const { name, score } = req.body;

  if (!name || score == null) {
    return res.status(400).json({ message: 'Name and score are required' });
  }

  const newGrade = new Grade({ name, score });
  try {
    const savedGrade = await newGrade.save();
    res.status(201).json(savedGrade);
  } catch (error) {
    res.status(500).json({ message: 'Error saving grade' });
  }
});

// PUT /api/grades/:id - Update a grade
router.put('/api/grades/:id', async (req, res) => {
  const { id } = req.params;
  const { name, score } = req.body;

  try {
    const updatedGrade = await Grade.findByIdAndUpdate(id, { name, score }, { new: true });
    if (!updatedGrade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json(updatedGrade);
  } catch (error) {
    res.status(500).json({ message: 'Error updating grade' });
  }
});

// DELETE /api/grades/:id - Delete a grade
router.delete('/api/grades/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGrade = await Grade.findByIdAndDelete(id);
    if (!deletedGrade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.status(204).send(); // Respond with no content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grade' });
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = router;