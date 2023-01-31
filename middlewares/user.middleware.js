const User = require('../models/user.model');

exports.validIfExistsUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.validIfExistsUserEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (user && !user.status) {
      return res.status(400).json({
        status: 'error',
        message:
          'The user have an account, but the account is disabled please contact to the administrator to enable it',
      });
    }
    next();
    if (user) {
      return res.status(400).json({
        status: 'error',
        message: 'The email already exists',
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
