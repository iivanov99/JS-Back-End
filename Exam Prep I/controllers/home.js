const models = require('../models');

module.exports = {
  get: {
    index: async (req, res) => {
      const { user } = req;
      let courses = [];

      if (user) {
        courses = await models.Course
          .find({ isPublic: true })
          .sort({ createdAt: -1 });
      } else {
        courses = await models.Course
          .find({ isPublic: true })
          .sort({ usersEnrolled: -1 })
          .limit(3);
      }

      res.render('home/index', { user, courses });
    },
    search: async (req, res) => {
      const { user } = req;
      const { title } = req.query;
      const courses = await models.Course.find({ title: { $regex: new RegExp(`${title}`, 'i') } });
      res.render('home/index', { user, courses });
    }
  }
};