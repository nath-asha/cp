const mongoose = require("mongoose");

const rubricTemplateSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  criteria: [
    {
      name: { type: String, required: true },
      weight: { type: Number, required: true },
      maxScore: { type: Number, default: 25 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RubricTemplate", rubricTemplateSchema);
