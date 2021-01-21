const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch {
    res.status(400).json({ success: false });
  }
};

// @desc    Get one bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    } else {
      res.status(200).json({ success: true, data: bootcamp });
    }
  } catch (err) {
    // res.status(400).json({ success: false });
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
};

// @desc    Create one bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Public
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update one bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({
        success: true,
        data: bootcamp,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete one bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({
        success: true,
        data: {},
      });
    }
  } catch {
    res.status(400).json({ success: false });
  }
};