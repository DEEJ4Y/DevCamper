const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    // query = Course.find().populate("bootcamp"); // Populates the bootcamp field with the parent bootcamp by reference in the schema.
    query = Course.find().populate({
      path: "bootcamp", // Schema reference
      select: "name description", // required fields to populate
    });
  }

  const courses = await query;

  res.status(200).json({ success: true, count: courses.length, data: courses });
});
