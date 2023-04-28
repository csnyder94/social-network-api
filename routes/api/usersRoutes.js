const router = require('express').Router(); //Importing Router

const { findUsers, findUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController'); //Require userController for functions

router.route('/').get(findUsers).post(createUser); //Find all users and create user routes

router.route('/:id').get(findUserById).put(updateUser).delete(deleteUser); //Find user by ID, update user (by ID), and delete user (by ID)

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend); //Add and delete friends (by ID)

module.exports = router; //Exporting router