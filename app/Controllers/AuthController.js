const AppError = require('../../utils/appError');
const userService = require('../../Services/Auth/User');
const { firstMonth, isPast } = require('../../helpers/scheduleHelpers')

exports.login = ((_, res, next) => {
  const user = userService.getUser();

  if (!user) {
    return next(new AppError('User not foud', 401));
  }

  if (!user.hasRated) {
    if (!user.joined) {
      userService.setJoinDate(user.id);

      var today = new Date();
      const nextRatingDate = today.setDate(today.getDate() + 5);
      user.lastRatingPrompt = nextRatingDate;
      userService.scheduleRating(nextRatingDate);
    } else {
      const lastRatingPrompt = user.lastRatingPrompt;
      if (isPast(lastRatingPrompt)) {
        // last prompt was sent, schedule next one
        if (firstMonth(user.joined)) {
          // schedule for 5 days time
          var today = new Date();
          const nextRatingDate = today.setDate(today.getDate() + 5);
          user.lastRatingPrompt = nextRatingDate;
          userService.scheduleRating(nextRatingDate);
        } else {
          // schedule for 3 weeks time
          const today = new Date();
          const nextRatingDate = today.setDate(now.getDate() + 3 * 7)
          user.lastRatingPrompt = nextRatingDate;
          userService.scheduleRating(nextRatingDate);
        }
      }
    }
  }

  return userService.createSendToken(user, 200, res);
});

exports.updateRatingStatus = ((req, res, next) => {
  const user = userService.findUser(req.body.id);
  user.hasRated = true;

  res.status(200).json({
    status: "success",
  })
});

exports.updateRatingLastShown = ((req, res, next) => {
  const user = userService.findUser(req.body.id);

  if (!user.hasRated) {
    if (!user.joined) {
      userService.setJoinDate(user.id);

      var today = new Date();
      const nextRatingDate = today.setDate(today.getDate() + 5);
      user.lastRatingPrompt = nextRatingDate;
      userService.scheduleRating(nextRatingDate);
    } else {
      const lastRatingPrompt = user.lastRatingPrompt;
      if (isPast(lastRatingPrompt)) {
        // last prompt was sent, schedule next one
        if (firstMonth(user.joined)) {
          // schedule for 5 days time
          var today = new Date();
          const nextRatingDate = today.setDate(today.getDate() + 5);
          user.lastRatingPrompt = nextRatingDate;
          userService.scheduleRating(nextRatingDate);
        } else {
          // schedule for 3 weeks time
          const today = new Date();
          const nextRatingDate = today.setDate(now.getDate() + 3 * 7)
          user.lastRatingPrompt = nextRatingDate;
          userService.scheduleRating(nextRatingDate);
        }
      }
    }
  }

  res.status(200).json({
    status: "success",
  })
});