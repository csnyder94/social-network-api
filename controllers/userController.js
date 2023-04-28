const { User } = require('../models'); //Importing users from models

const userController = {
  findUsers(req, res) {
    User.find({}) //Find all users in the database
      .populate({ //Populate the thoughts field of each user with thought data
        path: 'thoughts', //Specify Path
        select: '-__v', //Exclude the '__v' field from the thought data
      })
      .select('-__v') //Exclude the '__v' field from the user data
      .then((UserData) => res.json(UserData)) //If successful, respond with the user data as a JSON object
      .catch((err) => { //If an error occurs, log it to the console and send a 400 status code
        console.log(err);
        res.sendStatus(400);
      });
  },

  findUserById({ params }, res) { //Find user by ID
    User.findOne({ _id: params.id }) //Finding by ID
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then((UserData) => {
        if (!UserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => res.json(err));
  },

  createUser({ body }, res) { //Create a new user
    User.create(body)
      .then((UserData) => res.json(UserData))
      .catch((err) => res.json(err));
  },

  updateUser({ params, body }, res) { //Update a user by ID
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true, //Validating data against schema
    })
      .then((UserData) => {
        if (!UserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) { //Deleting user by ID
    User.findOneAndDelete({ _id: params.id })
      .then((UserData) => res.json(UserData))
      .catch((err) => res.json(err));
  },

  addFriend({ params }, res) { //Adding a friend 
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } }, //Using friend ID to add friend with push
      { new: true }
    )
      .then((UserData) => {
        if (!UserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => res.json(err));
  },

  removeFriend({ params }, res) { //Removing a firend
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } }, //Removing friend by ID with pull
      { new: true }
    )
      .then((UserData) => res.json(UserData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController; //Exporting const