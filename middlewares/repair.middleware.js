const Repair = require('../models/repair.model');

exports.validIfExistsRepair = async (req, res, next) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }
    req.repair = repair;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
