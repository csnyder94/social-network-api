const router = require('express').Router(); //Importing express router

const { getAllThoughts, findThought, createThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thoughtController'); //Importing functions

router.route('/').get(getAllThoughts) //Get all thoughts and create thought route

router.route('/:userId').post(createThought);

router.route('/:id').get(findThought).put(updateThought);

router.route('/:userId/:thoughtId').delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction); //Create reaction to thought by ID

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction); //Delete reaction by ID from thought by ID

module.exports = router; //Exporting Router