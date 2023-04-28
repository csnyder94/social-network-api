const router = require('express').Router(); //Importing express router

const { getAllThoughts, findThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController'); //Importing functions

router.route('/').get(getAllThoughts).post(createThought); //Get all thoughts and create thought route

router.route('/:thoughtId').get(findThought).put(updateThought).delete(deleteThought);  //Find thought by ID, update thought (by ID), and delete thought (by ID)

router.route('/:thoughtId/reactions').post(addReaction); //Create reaction to thought by ID

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction); //Delete reaction by ID from thought by ID

module.exports = router; //Exporting Router