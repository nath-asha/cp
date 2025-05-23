const express = require("express");
const router = express.Router();
const RubricTemplate = require("../models/rubricTemplateSchema");
const RubricScore = require("../models/rubricScoreSchema");

// Create a rubric template for an event
router.post("/api/rubric-template", async (req, res) => {
  try {
    const { eventId, criteria } = req.body;

    const existing = await RubricTemplate.findOne({ eventId });
    if (existing) {
      return res.status(400).json({ message: "Rubric already exists for this event." });
    }

    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    if (totalWeight !== 1) {
      return res.status(400).json({ message: "Total weight of all criteria must be exactly 1." });
    }

    const template = await RubricTemplate.create({ eventId, criteria });
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update rubric template
router.put("/api/rubric-template/:eventId", async (req, res) => {
  try {
    const { criteria } = req.body;
    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    if (totalWeight !== 1) {
      return res.status(400).json({ message: "Total weight must be exactly 1." });
    }

    const updated = await RubricTemplate.findOneAndUpdate(
      { eventId: req.params.eventId },
      { criteria },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Rubric not found." });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete rubric template
router.delete("/api/rubric-template/:eventId", async (req, res) => {
  try {
    const deleted = await RubricTemplate.findOneAndDelete({ eventId: req.params.eventId });
    if (!deleted) return res.status(404).json({ message: "Rubric not found." });
    res.json({ message: "Rubric deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete rubric score
router.delete("/api/rubric-score/:id", async (req, res) => {
  try {
    const deleted = await RubricScore.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Score not found." });
    res.json({ message: "Score deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Other routes 
// Create a rubric template for an event
router.post("/api/rubric-template", async (req, res) => {
  try {
    const { eventId, criteria } = req.body;

    const existing = await RubricTemplate.findOne({ eventId });
    if (existing) {
      return res.status(400).json({ message: "Rubric already exists for this event." });
    }

    const template = await RubricTemplate.create({ eventId, criteria });
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get rubric template by event ID
router.get("/api/rubric-template/:eventId", async (req, res) => {
  try {
    const template = await RubricTemplate.findOne({ eventId: req.params.eventId });
    if (!template) return res.status(404).json({ message: "Rubric not found" });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit rubric scores for a team
router.post("/api/rubric-score", async (req, res) => {
  try {
    const { eventId, teamId, scores, evaluatorName, comments } = req.body;

    const template = await RubricTemplate.findOne({ eventId });
    if (!template) return res.status(404).json({ message: "Rubric template not found" });

    let totalScore = 0;
    for (const s of scores) {
      const crit = template.criteria.find(c => c.name === s.criterion);
      if (!crit) return res.status(400).json({ message: `Invalid criterion: ${s.criterion}` });
      totalScore += s.score * crit.weight;
    }

    const result = await RubricScore.create({
      eventId,
      teamId,
      scores,
      evaluatorName,
      comments,
      totalScore
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all scores for an event
router.get("/api/rubric-score/event/:eventId", async (req, res) => {
  try {
    const scores = await RubricScore.find({ eventId: req.params.eventId });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all scores for a team in an event
router.get("/api/rubric-score/event/:eventId/team/:teamId", async (req, res) => {
  try {
    const scores = await RubricScore.find({
      eventId: req.params.eventId,
      teamId: req.params.teamId,
    });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
