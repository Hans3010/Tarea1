const Repair = require('../models/repair.model');

exports.findRepairs = async (req, res) => {
  try {
    const users = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });
    res.json({
      status: 'success',
      message: 'The repairs were found successfully',
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
exports.findRepair = async (req, res) => {
  try {
    const { repair } = req;
    res.status(200).json({
      status: 'success',
      message: 'The pending repair was found successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const newRepair = await Repair.create({
      date,
      userId,
    });
    res.status(201).json({
      status: 'success',
      message: 'The repair was created sucessfully',
      newRepair,
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
exports.updateRepair = async (req, res) => {
  try {
    const { repair } = req;
    const { status } = req.body;
    const updatedRepair = await repair.update({
      status,
    });
    res.status(200).json({
      status: 'success',
      message: 'The repair was completed successfully',
      updatedRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { repair } = req;
    await repair.update({ status: 'cancelled' });
    res.status(200).json({
      status: 'success',
      message: 'The repair was cancelled successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
