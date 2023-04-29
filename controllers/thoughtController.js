const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({}) //Find all thoughts 
            .then((ThoughtData) => res.json(ThoughtData)) //If successful, respond with the thought data as a JSON object
            .catch((err) => { // If an error occurs, send a 400 status code and the error message as a JSON object in the response
                res.status(400).json(err);
            });
    },

    findThought({ params }, res) { //Find thought by ID
        Thought.findOne({ _id: params.id }) //Using ID param
            .then((ThoughtData) => {
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch((err) => res.json(err));
    },

    createThought({ params, body }, res) {
        Thought.create(body) //Create a thought
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } }, //Adding thoughts to user by ID using push
                    { new: true }
                );
            })
            .then((ThoughtData) => {
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No user with this id' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch((err) => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true }) //Find and update thought by ID
            .then((ThoughtData) => {
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate( //Find thought by ID and add reaction
            { _id: params.thoughtId },
            { $push: { reactions: body } }, //Adding reaction to thought by ID using push
            { new: true, runValidators: true } //Validating data against schema
        )
            .then((ThoughtData) => {
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate( //Find and remove a reaction through finding and updating thought by ID
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } }, //Deleting reaction by pull 
            { new: true }
        )
            .then((ThoughtData) => res.json(ThoughtData))
            .catch((err) => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId }) //Finding and deleting thought by ID
            .then((ThoughtData) => {
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                return User.findOneAndUpdate( //Updating user
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } }, //Pulling thought from user
                    { new: true }
                );
            })
            .then((ThoughtData) => {
                console.log(ThoughtData);
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
};

module.exports = thoughtController; //Exporting const