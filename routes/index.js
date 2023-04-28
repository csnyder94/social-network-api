const router = require('express').Router(); //Import express router
const apiRoutes = require('./api'); //Import apiRoutes

router.use('/api', apiRoutes); //Using apiRoutes

router.use((req, res) => { //Wrong route error
  return res.send('Wrong route!');
});

module.exports = router; //Export route