const challengesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    trackId: { type: String, required: true },
});

const chall = mongoose.model("challenges", challengesSchema);
