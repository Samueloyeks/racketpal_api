const jwt = require("jsonwebtoken");
const schedule = require('node-schedule');
const userList = require("../../utils/userList");
const sse = require('../../sse');

exports.getUser = () => {
  // returns random user
  return userList[Math.floor(Math.random() * userList.length - 1) + 1];
};

exports.findUser = (id) => {
  // returns random user
  return userList.find(user => user.id == id);
};

exports.setJoinDate = (userId) => {
  let user = userList.find(user => user.id === userId);
  user.joined = new Date();
};

const signToken = (id) => {
  /**
   * @param {{JWT_EXPIRES_IN:string}} process.env
   */
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (user, statusCode, res) => {
  /**
   * @param {{JWT_COOKIE_EXPIRES_IN:string}} process.env
   */
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.scheduleRating = (scheduledDate) => {
  try {
    schedule.scheduleJob(
      "ratingPrompt",
      new Date(scheduledDate),
      () => sse.send(scheduledDate, "message")
    );
  } catch (ex) {
    console.log("err=>", ex)
  }
}

exports.cancelRatingSchedule = () => {
  schedule.cancelJob('ratingPrompt');
}
