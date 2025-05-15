const mongoose = require('mongoose');

const rubricSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    criteria: [
        {
            criterionName: { type: String, required: true },
            maxScore: { type: Number, required: true },
            description: { type: String, required: true }
        }
    ],
    eventId : String
});

module.exports = mongoose.model('Rubric', rubricSchema);
