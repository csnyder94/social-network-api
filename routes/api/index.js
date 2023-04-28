const router = require('express').Router(); //Import express router
const thoughtsRoutes = require('./thoughtsRoutes'); //Importing thoughts route
const usersRoutes = require('./usersRoutes'); //Importing users route

router.use('/thoughts', thoughtsRoutes); //API Route
router.use('/users', usersRoutes); //API Route

module.exports = router; //Exporting Router