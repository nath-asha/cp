const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    submission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        required: true
    },
    rubric: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rubric',
        required: true
    },
    scores: [
        {
            criterionName: { type: String, required: true },
            score: { type: Number, required: true },
        }
    ],
    feedback: { type: String },
    finalized: { type: Boolean, default: false },
    evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
