const models = require('../models');
const utils = require('../utils');

module.exports = {
  get: {
    create: (req, res) => {
      const { user } = req;
      res.render('course/create', { user });
    },
    details: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        const course = await models.Course.findById(id);

        const isCreator = user._id.toString() === course.creatorId.toString();
        const isEnrolled = course.usersEnrolled.includes(user._id);

        res.render('course/details', { user, course, isCreator, isEnrolled });
      } catch (err) {
        console.error(err);
      }
    },
    enroll: async (req, res) => {
      try {
        const { user } = req;
        const { id: courseId } = req.params;
        await Promise.all([
          models.User.updateOne({ _id: user._id }, { $push: { enrolledCourses: courseId } }),
          models.Course.updateOne({ _id: courseId }, { $push: { usersEnrolled: user._id } })
        ]);
        res.redirect(`/course/details/${courseId}`);
      } catch (err) {
        console.error(err);
      }
    },
    edit: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        const course = await models.Course.findOne({ _id: id, creatorId: user._id });

        if (!course) {
          throw new Error('Current user is not the course creator!');
        }

        res.render('course/edit', { user, course })
      } catch (err) {
        if (err.message === 'Current user is not the course creator!') {
          res.redirect('/');
          return;
        }
        console.error(err);
      }
    },
    delete: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        await models.Course.findOneAndDelete({ _id: id, creatorId: user._id });
        res.redirect('/');
      } catch (err) {
        console.error(err);
      }
    }
  },
  post: {
    create: async (req, res) => {
      try {
        const { user } = req;
        const { title, description, imageUrl } = req.body;
        const isPublic = req.body.isPublic === 'on';
        const createdAt = new Date().toLocaleString();
        const creatorId = user._id;

        await models.Course.create({ title, description, imageUrl, isPublic, createdAt, creatorId });
        res.redirect('/');
      } catch (err) {
        let errors = [];

        if (err.name === 'MongoError' && err.code === 11000) {
          errors = [{ message: 'This course is already created!' }];
        } else if (err.name === 'ValidationError') {
          errors = utils.extractValidationErrors(err);
        }

        res.render('course/create', { user: req.user, errors, oldInput: req.body });
      }
    },
    edit: async (req, res) => {
      const { user } = req;
      const { id } = req.params;
      const { title, description, imageUrl } = req.body;
      const isPublic = req.body.isPublic === 'on';

      try {
        await models.Course.updateOne({ _id: id, creatorId: user._id }, { title, description, imageUrl, isPublic }, { runValidators: true });
        res.redirect('/');
      } catch (err) {
        let errors = [];
        
        if (err.name === 'MongoError' && err.code === 11000) {
          errors = [{ message: 'This course is already created!' }];
        } else if (err.name === 'ValidationError') {
          errors = utils.extractValidationErrors(err);
        }

        const oldInput = { _id: id, title, description, imageUrl, isPublic };
        res.render('course/edit', { errors, user, course: oldInput });
      }
    }
  }
};