const router = require("express").Router();
const { User } = require('../../models');

// route is /api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(req.body);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    console.log(validPassword)

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      console.log(req.session);
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Search users based on user form input
router.post('/find', async (req, res) => {
  try {
    const userResults = await User.findOne({
      where: { ...req.body }
    });

    if (!userResults) {
      res.status(404).json("Could not find user");
      return;
    }

    res.status(200).json(userResults);
  } catch (e) {
    res.status(500).json(e);
  }
});

// router.put for update password when on actual update password page
router.put('/updatepassword', async (req, res) => {
  try {
    const currentUser = await User.findOne({ where: { id: req.session.user_id } });
    console.log(req.body);

    const currentPassword = await currentUser.checkPassword(req.body.currentPassword);
    console.log(currentPassword)

    if (!currentPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }
    await currentUser.update({ password: req.body.newPassword }, { where: {id: req.session.user_id}})

    res.status(200).json({ message: 'Successfully updated password'})


  } catch (e) {
    res.status(500).json(e);
  }

});


module.exports = router;