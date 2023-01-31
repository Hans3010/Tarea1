const User = require('../models/user.model');

// /api/v1/users/
exports.findUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: true,
      },
    });
    res.json({
      status: 'success',
      message: 'The users were found successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.findUser = async (req, res) => {
  try {
    const { user } = req;
    res.status(200).json({
      status: 'success',
      message: 'The user was found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password,
    });
    res.status(201).json({
      status: 'success',
      message: 'The user was created sucessfully',
      newUser,
    });
  } catch (error) {
    console.log(error);
    if (error.parent.code === '22P02') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid DataType in your request',
      });
    }
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;
    const updatedUser = await user.update({
      name,
      email,
    });
    res.status(200).json({
      status: 'success',
      message: 'The user was updated successfully',
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: false });
    res.status(200).json({
      status: 'success',
      message: 'The user was deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
